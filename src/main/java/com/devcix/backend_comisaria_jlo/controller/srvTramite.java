package com.devcix.backend_comisaria_jlo.controller;

import com.devcix.backend_comisaria_jlo.model.Tramite;
import com.devcix.backend_comisaria_jlo.utils.ExportarPDFTramites;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "srvTramite", urlPatterns = {"/tramite"})
public class srvTramite extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String accion = request.getParameter("accion");
        if (accion != null) {
            switch (accion) {
                case "ExportarPDF":
                    exportarPDF(request, response);
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
        Gson g = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                .registerTypeAdapter(Date.class, (JsonDeserializer<Date>) (json, typeOfT, context) -> new Date(json.getAsJsonPrimitive().getAsLong()))
                .create();
        List<Tramite> tramites = g.fromJson(strLista, new TypeToken<List<Tramite>>() {
        }.getType());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String nomFile = dateFormat.format(new Date());
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
}
