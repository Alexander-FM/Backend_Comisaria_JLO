package com.devcix.backend_comisaria_jlo.controller;

import com.devcix.backend_comisaria_jlo.model.Policia;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "srvLogin", urlPatterns = {"/srvLogin"})
public class srvLogin extends HttpServlet {

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
            Policia p = new Gson().fromJson(data, Policia.class);
            request.getSession().setAttribute("usuario", p);
        } catch (Exception e) {
            System.out.println("Error al asignar la sesión:" + e.getMessage());
        }

    }

    private void cerrarsession(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession sesion = request.getSession();
        sesion.removeAttribute("usuario");
        sesion.invalidate();
        response.sendRedirect("index.jsp");
    }

}
