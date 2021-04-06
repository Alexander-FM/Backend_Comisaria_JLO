package com.devcix.backend_comisaria_jlo.controller;

import com.devcix.backend_comisaria_jlo.model.Denuncias;
import com.devcix.backend_comisaria_jlo.utils.ExportarPDF;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.reflect.TypeToken;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.data.empty.EmptyDataAdapterImpl;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JsonDataSource;

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
            response.sendRedirect("../index.jsp");
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

    private void exportarPDF(HttpServletRequest request, HttpServletResponse response) {
        String strLista = request.getParameter("lista");
        Gson g = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                .registerTypeAdapter(Date.class, (JsonDeserializer<Date>) (json, typeOfT, context) -> new Date(json.getAsJsonPrimitive().getAsLong()))
                .create();
        List<Denuncias> denuncias = g.fromJson(strLista, new TypeToken<List<Denuncias>>() {
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
        try {
            InputStream reporte = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/Denuncias.jasper");
            InputStream datasource=this.getServletConfig().getServletContext().getResourceAsStream("/reportes/Adapter_Reportes_Denuncia.xml");
            ServletOutputStream out = response.getOutputStream();
            if (reporte != null) {
                
                JasperRunManager.runReportToPdfStream(reporte, out, new HashMap<String, Object>(),new JREmptyDataSource());
                response.setContentType("application/pdf;charset=UTF-8");
                response.addHeader("Content-disposition", "inline; filename=RDenuncia.pdf");
                out.flush();
                out.close();
            } else {
                response.setContentType("text/plain");
                response.getOutputStream().print("archivo de reporte no encontrado");
            }

        } catch (Exception e) {
            System.out.println("No se pudo Mostrar el reporte:" + e.getMessage());
        }
    }

}
