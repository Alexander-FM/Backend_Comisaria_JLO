package com.devcix.backend_comisaria_jlo.model;

public class Policia {

    private int idPolicia;
    private String nombres;
    private String apellidos;
    private String sexo;
    private TipoIdentificacion tipoIdentificacion;
    private String numeroIdentificacion;
    private Distrito distrito;
    private GradoPNP gradoPNP;
    private String telefono;
    private boolean estado;

    public int getIdPolicia() {
        return idPolicia;
    }

    public void setIdPolicia(int idPolicia) {
        this.idPolicia = idPolicia;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public TipoIdentificacion getTipoIdentificacion() {
        return tipoIdentificacion;
    }

    public void setTipoIdentificacion(TipoIdentificacion tipoIdentificacion) {
        this.tipoIdentificacion = tipoIdentificacion;
    }

    public String getNumeroIdentificacion() {
        return numeroIdentificacion;
    }

    public void setNumeroIdentificacion(String numeroIdentificacion) {
        this.numeroIdentificacion = numeroIdentificacion;
    }

    public Distrito getDistrito() {
        return distrito;
    }

    public void setDistrito(Distrito distrito) {
        this.distrito = distrito;
    }

    public GradoPNP getGradoPNP() {
        return gradoPNP;
    }

    public void setGradoPNP(GradoPNP gradoPNP) {
        this.gradoPNP = gradoPNP;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public String getNombresCompletos() {
        return this.nombres + " " + this.apellidos;
    }

}
