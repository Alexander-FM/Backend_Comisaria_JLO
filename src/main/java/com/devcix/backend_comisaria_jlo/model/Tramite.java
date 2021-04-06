package com.devcix.backend_comisaria_jlo.model;

import java.util.Date;

public class Tramite {
    private int id_tramite;
    private String cod_tramite;
    private boolean estadoTramite;
    private Date fechaDenuncia;
    private TipoTramite tipoTramite;
    private Policia policiaId;
    private UsuarioDenunciante usuarioDenun;

    public int getId_tramite() {
        return id_tramite;
    }

    public void setId_tramite(int id_tramite) {
        this.id_tramite = id_tramite;
    }

    public String getCod_tramite() {
        return cod_tramite;
    }

    public void setCod_tramite(String cod_tramite) {
        this.cod_tramite = cod_tramite;
    }

    public boolean isEstadoTramite() {
        return estadoTramite;
    }

    public void setEstadoTramite(boolean estadoTramite) {
        this.estadoTramite = estadoTramite;
    }

    public Date getFechaDenuncia() {
        return fechaDenuncia;
    }

    public void setFechaDenuncia(Date fechaDenuncia) {
        this.fechaDenuncia = fechaDenuncia;
    }

    public TipoTramite getTipoTramite() {
        return tipoTramite;
    }

    public void setTipoTramite(TipoTramite tipoTramite) {
        this.tipoTramite = tipoTramite;
    }

    public Policia getPoliciaId() {
        return policiaId;
    }

    public void setPoliciaId(Policia policiaId) {
        this.policiaId = policiaId;
    }

    public UsuarioDenunciante getUsuarioDenun() {
        return usuarioDenun;
    }

    public void setUsuarioDenun(UsuarioDenunciante usuarioDenun) {
        this.usuarioDenun = usuarioDenun;
    }
    
    
}
