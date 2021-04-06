package com.devcix.backend_comisaria_jlo.model;

public class TipoDenuncia {

    private int id;
    private String tipoDenuncia;
    private String estado;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTipoDenuncia() {
        return tipoDenuncia;
    }

    public void setTipoDenuncia(String tipoDenuncia) {
        this.tipoDenuncia = tipoDenuncia;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}
