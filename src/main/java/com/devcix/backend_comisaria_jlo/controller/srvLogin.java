package com.devcix.backend_comisaria_jlo.controller;

import com.devcix.backend_comisaria_jlo.model.Policia;
import com.devcix.backend_comisaria_jlo.utils.DateSerializer;
import com.devcix.backend_comisaria_jlo.utils.TimeSerializer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "srvLogin", urlPatterns = {"/srvLogin"})
public class srvLogin extends HttpServlet {

    private final Gson g = new GsonBuilder()
            .registerTypeAdapter(Date.class, new DateSerializer())
            .registerTypeAdapter(Time.class, new TimeSerializer())
            .create();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        String accion = request.getParameter("accion");
        if (accion != null) {
            switch (accion) {
                case "asignarSesion":
                    asignarSession(request, response);
                    break;
                case "cerrar":
                    cerrarsession(request, response);
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

    private void asignarSession(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String data = request.getParameter("data");
            final Policia p = g.fromJson(data, Policia.class);
            request.getSession().setAttribute("usuario", p);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void cerrarsession(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession sesion = request.getSession();
        sesion.removeAttribute("usuario");
        sesion.invalidate();
        response.sendRedirect("index.jsp");
    }

}
