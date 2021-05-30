package com.devcix.backend_comisaria_jlo.model;

import com.devcix.backend_comisaria_jlo.model.Agraviado;
import com.devcix.backend_comisaria_jlo.model.Denuncia;

public final class DenunciaAgraviado {

    public int id;
    public Denuncia denuncia;
    public Agraviado agraviado;

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

    public Agraviado getAgraviado() {
        return agraviado;
    }

    public void setAgraviado(Agraviado agraviado) {
        this.agraviado = agraviado;
    }
}
