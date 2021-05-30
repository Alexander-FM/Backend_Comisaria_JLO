package com.devcix.backend_comisaria_jlo.model;

import java.sql.Date;

public final class Agraviado extends Persona {

    private boolean medidaProteccion;
    private String detalleProteccion;
    private String Juzgado;
    private Date fechaEmision;
    private String RHD;
    private InformacionAdicional informacionAdicional;
    private String telefono;
    private EstadoCivil estadoCivil;
    private Distrito distrito;
    private String direccion;

    public boolean isMedidaProteccion() {
        return medidaProteccion;
    }

    public void setMedidaProteccion(boolean medidaProteccion) {
        this.medidaProteccion = medidaProteccion;
    }

    public String getDetalleProteccion() {
        return detalleProteccion;
    }

    public void setDetalleProteccion(String detalleProteccion) {
        this.detalleProteccion = detalleProteccion;
    }

    public String getJuzgado() {
        return Juzgado;
    }

    public void setJuzgado(String juzgado) {
        Juzgado = juzgado;
    }

    public Date getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(Date fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public String getRHD() {
        return RHD;
    }

    public void setRHD(String RHD) {
        this.RHD = RHD;
    }

    public InformacionAdicional getInformacionAdicional() {
        return informacionAdicional;
    }

    public void setInformacionAdicional(InformacionAdicional informacionAdicional) {
        this.informacionAdicional = informacionAdicional;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public EstadoCivil getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(EstadoCivil estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public Distrito getDistrito() {
        return distrito;
    }

    public void setDistrito(Distrito distrito) {
        this.distrito = distrito;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    
}
