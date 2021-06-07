package com.devcix.backend_comisaria_jlo.controller;

import com.devcix.backend_comisaria_jlo.model.Denuncia;
import com.devcix.backend_comisaria_jlo.model.DenunciaConDetallesDTO;
import com.devcix.backend_comisaria_jlo.utils.DateSerializer;
import com.devcix.backend_comisaria_jlo.utils.ExportarPDF;
import com.devcix.backend_comisaria_jlo.utils.TimeSerializer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

    private final Gson g = new GsonBuilder()
            //.registerTypeAdapter(Date.class, (JsonDeserializer<Date>) (json, typeOfT, context) -> new Date(json.getAsJsonPrimitive().getAsLong()))
            .registerTypeAdapter(Date.class, new DateSerializer())
            .registerTypeAdapter(Time.class, new TimeSerializer())
            .create();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final String accion = request.getParameter("accion");
        if (accion != null) {
            switch (accion) {
                case "ExportarPDF":
                    exportarPDF(request, response);
                    break;
                case "ReporteJasperPDF":
                    reporteJasperPDF(request, response);
                    break;
                case "ExportarDenuncia":
                    exportarDenuncia(request, response);
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
        List<Denuncia> denuncias = g.fromJson(strLista, new TypeToken<List<Denuncia>>() {
        }.getType());
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy' 'HH:mm:ss");
        String nomFile = dateFormat.format(new java.util.Date());
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
            InputStream reporte = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/PlantillaDenuncias.jasper"),
                    logo = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/img/logo_pnp.png");
            String strLista = request.getParameter("lista");
            if (reporte != null && strLista != null) {
                List<Denuncia> denuncias = new ArrayList();
                denuncias.add(new Denuncia());
                denuncias.addAll(g.fromJson(strLista, new TypeToken<List<Denuncia>>() {
                }.getType()));
                JasperReport report = (JasperReport) JRLoader.loadObject(reporte);
                JRBeanArrayDataSource ds = new JRBeanArrayDataSource(denuncias.toArray());
                Map<String, Object> parameters = new HashMap();
                parameters.put("ds", ds);
                parameters.put("logo", logo);
                JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters, ds);
                JasperExportManager.exportReportToPdfStream(jasperPrint, out);
                response.setContentType("application/pdf");
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

    private void exportarDenuncia(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletOutputStream out = response.getOutputStream();
        try {
            InputStream plantilla = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/exportarDenuncia.jasper");
            String strDenuncia = request.getParameter("denuncia");
            if (plantilla != null && strDenuncia != null) {
                DenunciaConDetallesDTO dto = g.fromJson(strDenuncia, DenunciaConDetallesDTO.class);
                JasperReport report = (JasperReport) JRLoader.loadObject(plantilla);
                Map<String, Object> parameters = new HashMap();
                parameters.put("NombreComisaria", dto.getDenuncia().getComisarias().getNombreComisaria());
                parameters.put("NombrePoliciaYGrado", dto.getDenuncia().getPolicia().getNombreCompleto() + " - " + dto.getDenuncia().getPolicia().getGradoPNP().getNombreGrado());
                parameters.put("VPD", dto.getDenuncia().getVinculoParteDenunciada().getNombre());
                parameters.put("TipoDenuncia", dto.getDenuncia().getTipoDenuncia().getTipoDenuncia());
                parameters.put("FechaHoraRegistros", dto.getDenuncia().getFechaDenuncia() + " - " + dto.getDenuncia().getHoraDenuncia());
                parameters.put("FechaHoraHechos", dto.getDenuncia().getFechaHechos() + " - " + dto.getDenuncia().getHoraHechos());
                parameters.put("LugarHechos", dto.getDenuncia().getDireccion() + dto.getDenuncia().getReferenciaDireccion());
                parameters.put("DatosDenunciante", dto.getDenuncia().getUsuario().getNombreCompleto() + " Identificado con DNI Nro. " + dto.getDenuncia().getUsuario().getNumeroIdentificacion());
                parameters.put("DatosDenunciado", dto.getDenunciados().get(0).getNombreCompleto());
                parameters.put("ResumenDenuncia", dto.getAgraviados().get(0).getRHD());
                parameters.put("CodigoPolicial", "?");
                parameters.put("DNIDenunciante", dto.getDenuncia().getUsuario().getNumeroIdentificacion());
                parameters.put("NombreDenunciante", dto.getDenuncia().getUsuario().getNombreCompleto());
                JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters);
                response.setContentType("application/pdf");
                response.addHeader("Content-disposition", "inline; filename=RDenuncia.pdf");
                JasperExportManager.exportReportToPdfStream(jasperPrint, out);
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
