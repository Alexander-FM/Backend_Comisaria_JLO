package com.devcix.backend_comisaria_jlo.model;

public final class Policia extends Persona {
    private GradoPNP gradoPNP;
    private boolean estado;

    public GradoPNP getGradoPNP() {
        return gradoPNP;
    }

    public void setGradoPNP(GradoPNP gradoPNP) {
        this.gradoPNP = gradoPNP;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
    
}
