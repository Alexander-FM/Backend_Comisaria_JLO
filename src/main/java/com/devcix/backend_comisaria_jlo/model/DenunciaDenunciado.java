package com.devcix.backend_comisaria_jlo.model;
public final class DenunciaDenunciado {
    public int id;
    public Denuncia denuncia;
    public Denunciado denunciado;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Denuncia getDenuncia() {
        return denuncia;
    }

    public void setDenuncia(Denuncia denuncia) {
        this.denuncia = denuncia;
    }

    public Denunciado getDenunciado() {
        return denunciado;
    }

    public void setDenunciado(Denunciado denunciado) {
        this.denunciado = denunciado;
    }
}
