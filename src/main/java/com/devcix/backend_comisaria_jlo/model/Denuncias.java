package com.devcix.backend_comisaria_jlo.model;

import java.util.Date;

public class Denuncias {

    private int id;
    private Date fechaDenuncia;
    private String cod_denuncia;
    private String direccion;
    private String referenciaDireccion;
    private Date fechaHechos;
    private boolean estadoDenuncia;
    private TipoDenuncia tipoDenuncia;
    private Distrito distrito;
    private VinculoParteDenunciada vinculoParteDenunciada;
    private Policia policia;

    public Denuncias() {
        this.id=0;
        this.fechaDenuncia=new Date();
        this.cod_denuncia="- - -";
        this.direccion="- - - ";
        this.referenciaDireccion="- - - ";
        this.fechaHechos=new Date();
        this.estadoDenuncia=false;
        this.tipoDenuncia=new TipoDenuncia();
        this.distrito=new Distrito();
        this.vinculoParteDenunciada=new VinculoParteDenunciada();
        this.policia=new Policia();
    }

    public Denuncias(int id, Date fechaDenuncia, String cod_denuncia, String direccion, String referenciaDireccion, Date fechaHechos, boolean estadoDenuncia, TipoDenuncia tipoDenuncia, Distrito distrito, VinculoParteDenunciada vinculoParteDenunciada, Policia policia) {
        this.id = id;
        this.fechaDenuncia = fechaDenuncia;
        this.cod_denuncia = cod_denuncia;
        this.direccion = direccion;
        this.referenciaDireccion = referenciaDireccion;
        this.fechaHechos = fechaHechos;
        this.estadoDenuncia = estadoDenuncia;
        this.tipoDenuncia = tipoDenuncia;
        this.distrito = distrito;
        this.vinculoParteDenunciada = vinculoParteDenunciada;
        this.policia = policia;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getFechaDenuncia() {
        return fechaDenuncia;
    }

    public void setFechaDenuncia(Date fechaDenuncia) {
        this.fechaDenuncia = fechaDenuncia;
    }

    public String getCod_denuncia() {
        return cod_denuncia;
    }

    public void setCod_denuncia(String cod_denuncia) {
        this.cod_denuncia = cod_denuncia;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getReferenciaDireccion() {
        return referenciaDireccion;
    }

    public void setReferenciaDireccion(String referenciaDireccion) {
        this.referenciaDireccion = referenciaDireccion;
    }

    public Date getFechaHechos() {
        return fechaHechos;
    }

    public void setFechaHechos(Date fechaHechos) {
        this.fechaHechos = fechaHechos;
    }

    public boolean isEstadoDenuncia() {
        return estadoDenuncia;
    }

    public void setEstadoDenuncia(boolean estadoDenuncia) {
        this.estadoDenuncia = estadoDenuncia;
    }

    public TipoDenuncia getTipoDenuncia() {
        return tipoDenuncia;
    }

    public void setTipoDenuncia(TipoDenuncia tipoDenuncia) {
        this.tipoDenuncia = tipoDenuncia;
    }

    public Distrito getDistrito() {
        return distrito;
    }

    public void setDistrito(Distrito distrito) {
        this.distrito = distrito;
    }

    public VinculoParteDenunciada getVinculoParteDenunciada() {
        return vinculoParteDenunciada;
    }

    public void setVinculoParteDenunciada(VinculoParteDenunciada vinculoParteDenunciada) {
        this.vinculoParteDenunciada = vinculoParteDenunciada;
    }

    public Policia getPolicia() {
        return policia;
    }

    public void setPolicia(Policia policia) {
        this.policia = policia;
    }
    //EXTRAS
        public String getNombreCompletoPolicia() {
        /*this.nombreCompletoPolicia = policia != null ? this.policia.getNombres() + " " + this.policia.getApellidos() : " - - - ";
        return nombreCompletoPolicia;*/
        return this.policia != null ? this.policia.getNombres() + " " + this.policia.getApellidos() : " - - - ";
    }

    public String getNombreDistrito() {
        return this.distrito!=null?this.distrito.getDistrito():"- - - ";
    }
    public String getNombreTipoDenuncia(){
        return this.tipoDenuncia!=null?this.tipoDenuncia.getTipoDenuncia():"- - - ";
    }
    public String getNombreVPD(){
        return this.vinculoParteDenunciada!=null?this.vinculoParteDenunciada.getNombre():"- - - ";
    }
}
