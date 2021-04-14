package com.devcix.backend_comisaria_jlo.model;

public final class Provincia {
    private int id;
    private String provincia;
    private boolean estado;
    private Departamento departamento;

    /*La parte izquierda hace referencia a la clase actual y la parte derecha a la clase destino quedaría de la siguiente
    * manera Muchas provincias pertenecen a un departamento.*/

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }


}
