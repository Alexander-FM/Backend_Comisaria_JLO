package com.devcix.backend_comisaria_jlo.controller;

import com.devcix.backend_comisaria_jlo.model.Denuncia;
import com.devcix.backend_comisaria_jlo.utils.DateDeserializer;
import com.devcix.backend_comisaria_jlo.utils.ExportarPDF;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

@WebServlet(name = "srvDenuncia", urlPatterns = {"/denuncia"})
public class srvDenuncia extends HttpServlet {
    
    static {
        System.setProperty("java.awt.headless", "true");
    }
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String accion = request.getParameter("accion");
        if (accion != null) {
            switch (accion) {
                case "ExportarPDF":
                    exportarPDF(request, response);
                    break;
                case "ReporteJasperPDF":
                    reporteJasperPDF(request, response);
                    break;
            }
        } else {
            response.sendRedirect("index.jsp");
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private void exportarPDF(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String strLista = request.getParameter("lista");
        Gson g = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                .registerTypeAdapter(Date.class, (JsonDeserializer<Date>) (json, typeOfT, context) -> new Date(json.getAsJsonPrimitive().getAsLong()))
                .create();
        List<Denuncia> denuncias = g.fromJson(strLista, new TypeToken<List<Denuncia>>() {
        }.getType());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String nomFile = dateFormat.format(new Date());
        String variable1 = "Content-Disposition";
        String variable2 = "inline; filename=Denuncias" + nomFile + ".pdf";
        response.setContentType("application/pdf;charset=UTF-8");
        response.setHeader(variable1, variable2);
        try {
            ExportarPDF exportarPDF = new ExportarPDF(denuncias);//Falta pasar la lista de denuncias --ImplementsController.getUsers()
            exportarPDF.export(response);
        } catch (Exception e) {
            System.out.println("error" + e.getMessage());
        }
    }
    
    private void reporteJasperPDF(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletOutputStream out = response.getOutputStream();
        try {
            InputStream reporte = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/PlantillaDenuncias.jasper");
            String strLista = request.getParameter("lista");
            if (reporte != null && strLista != null) {
                Gson g = new GsonBuilder()
                        .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                        .registerTypeAdapter(Date.class,new DateDeserializer())
                        .create();
                List<Denuncia> denuncias = new ArrayList();
                denuncias.add(new Denuncia());
                denuncias.addAll(g.fromJson(strLista, new TypeToken<List<Denuncia>>() {
                }.getType()));
                JasperReport report = (JasperReport) JRLoader.loadObject(reporte);
                JRBeanArrayDataSource ds = new JRBeanArrayDataSource(denuncias.toArray());
                Map<String,Object> parameters = new HashMap();
                parameters.put("ds", ds);
                JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters, ds);
                JasperExportManager.exportReportToPdfStream(jasperPrint, out);
                response.setContentType("application/pdf;charset=UTF-8");
                response.addHeader("Content-disposition", "inline; filename=RDenuncia.pdf");
                out.flush();
                out.close();
            } else {
                response.setContentType("text/plain");
                out.println("no se pudo generar el reporte");
                out.println("esto puede debrse a que la lista de datos no fue recibida o el archivo plantilla del reporte no se ha encontrado");
                out.println("contacte a soporte");
            }
            
        } catch (Exception e) {
            response.setContentType("text/plain");
            out.print("ocurrió un error al intentar generar el reporte:" + e.getMessage());
            e.printStackTrace();
        }
    }
    
}
