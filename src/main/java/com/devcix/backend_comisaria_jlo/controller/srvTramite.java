package com.devcix.backend_comisaria_jlo.controller;

import com.devcix.backend_comisaria_jlo.model.Denuncia;
import com.devcix.backend_comisaria_jlo.model.Tramite;
import com.devcix.backend_comisaria_jlo.utils.DateSerializer;
import com.devcix.backend_comisaria_jlo.utils.ExportarPDFTramites;
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
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

@WebServlet(name = "srvTramite", urlPatterns = {"/tramite"})
public class srvTramite extends HttpServlet {

    private final Gson g = new GsonBuilder()
            .registerTypeAdapter(Date.class, new DateSerializer())
            .registerTypeAdapter(Time.class, new TimeSerializer())
            .create();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String accion = request.getParameter("accion");
        if (accion != null) {
            switch (accion) {
                case "ExportarPDF":
                    this.exportarPDF(request, response);
                    break;
                case "ReporteJasperPDF":
                    this.reporteJasperPDF(request, response);
                    break;
                case "ImprimirTramite":
                    this.imprimirTramite(request, response);
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
    }

    private void exportarPDF(HttpServletRequest request, HttpServletResponse response) {
        String strLista = request.getParameter("lista");
        List<Tramite> tramites = this.g.fromJson(strLista, new TypeToken<List<Tramite>>() {
        }.getType());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String nomFile = dateFormat.format(new java.util.Date());
        String variable1 = "Content-Disposition";
        String variable2 = "inline; filename=Tramite" + nomFile + ".pdf";
        response.setContentType("application/pdf;charset=UTF-8");
        response.setHeader(variable1, variable2);
        try {
            ExportarPDFTramites exportarPDF = new ExportarPDFTramites(tramites);//Falta pasar la lista de denuncias --ImplementsController.getUsers()
            exportarPDF.export(response);
        } catch (Exception e) {
            System.out.println("error" + e.getMessage());
        }
    }

    private void reporteJasperPDF(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletOutputStream out = response.getOutputStream();
        try {
            InputStream reporte = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/PlantillaTramites.jasper"),
                                        logo = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/img/escudo.png"),
                    escudo = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/img/logo_pnp.png");
            String strLista = request.getParameter("lista");
            if (reporte != null && strLista != null) {
                List<Tramite> tramites = new ArrayList();
                tramites.add(new Tramite());
                tramites.addAll(this.g.fromJson(strLista, new TypeToken<List<Tramite>>() {
                }.getType()));
                JasperReport report = (JasperReport) JRLoader.loadObject(reporte);
                JRBeanArrayDataSource ds = new JRBeanArrayDataSource(tramites.toArray());
                Map<String, Object> parameters = new HashMap();
                parameters.put("ds", ds);
                parameters.put("logo", logo);
                parameters.put("escudo", escudo);
                JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters, ds);
                JasperExportManager.exportReportToPdfStream(jasperPrint, out);
                response.setContentType("application/pdf");
                response.addHeader("Content-disposition", "inline; filename=RTramite.pdf");
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

    private void imprimirTramite(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletOutputStream out = response.getOutputStream();
        try {
            InputStream formato = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/FormatoTramite.jasper"),
                    img1 = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/img/escudo.png"),
                    img2 = this.getServletConfig().getServletContext().getResourceAsStream("/reportes/img/pnp.png");
            Tramite t = g.fromJson(request.getParameter("tramite"), Tramite.class);
            JasperReport report = (JasperReport) JRLoader.loadObject(formato);
            Map<String, Object> parameters = new HashMap();
            parameters.put("img1", img1);
            parameters.put("img2", img2);
            parameters.put("NombreSolicitante", t.getUsuario().getNombreCompleto() + " (" + t.getSolicitante() + ")");
            parameters.put("Documento", t.getUsuario().getNumeroIdentificacion());
            parameters.put("Domicilio", t.getUsuario().getDireccion());
            parameters.put("Distrito", t.getUsuario().getDistrito().getDistrito());
            parameters.put("Provincia", t.getUsuario().getDistrito().getProvincia().getProvincia());
            parameters.put("Departamento", t.getUsuario().getDistrito().getProvincia().getDepartamento().getDepartamento());
            parameters.put("Telefono", t.getTelefono());
            parameters.put("Correo", t.getCorreo());
            parameters.put("MotivoDenunciaPolicial", t.getMotivo_denuncia_policial());
            parameters.put("DependenciaPolicial", t.getComisarias().getNombreComisaria());
            parameters.put("Observaciones", t.getObservaciones());
            Calendar calendarFecha = Calendar.getInstance(), calendarHora = Calendar.getInstance();
            calendarFecha.setTime(t.getFechaTramite());
            calendarHora.setTime(t.getHoraTramite());
            String fechaHoraRecepcion = "" + calendarFecha.get(Calendar.DAY_OF_MONTH) + "/" + (calendarFecha.get(Calendar.MONTH) + 1) + "/" + calendarFecha.get(Calendar.YEAR) + " " + calendarHora.get(Calendar.HOUR_OF_DAY) + ":" + calendarHora.get(Calendar.MINUTE);
            parameters.put("FechaHoraRecepcion", fechaHoraRecepcion);
            JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
            JasperExportManager.exportReportToPdfStream(jasperPrint, out);
            response.setContentType("application/pdf; name=\"CopiaTramite.pdf\"");
            response.addHeader("Content-disposition", "inline; filename=CopiaTramite.pdf");
            out.flush();
            out.close();
        } catch (Exception e) {
            response.setContentType("text/plain");
            out.print("ocurrió un error al intentar imprimir el tramite:" + e.getMessage());
            e.printStackTrace();
        }
    }
}
