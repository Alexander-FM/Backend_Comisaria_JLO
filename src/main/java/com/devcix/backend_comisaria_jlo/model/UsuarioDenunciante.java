
package com.devcix.backend_comisaria_jlo.model;

public class UsuarioDenunciante {
    private int id;
    private String nombres;
    private String apellidosPaterno;
    private String apellidosMaterno;
    private String contrasenia;
    private String email;
    private String fechaNac;
    private TipoIdentificacion tipoIdentificacion;
    private String numeroIdentificacion;
    private String sexo; 
    private String telefono;
    private boolean vigencia;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidosPaterno() {
        return apellidosPaterno;
    }

    public void setApellidosPaterno(String apellidosPaterno) {
        this.apellidosPaterno = apellidosPaterno;
    }

    public String getApellidosMaterno() {
        return apellidosMaterno;
    }

    public void setApellidosMaterno(String apellidosMaterno) {
        this.apellidosMaterno = apellidosMaterno;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFechaNac() {
        return fechaNac;
    }

    public void setFechaNac(String fechaNac) {
        this.fechaNac = fechaNac;
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

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public boolean isVigencia() {
        return vigencia;
    }

    public void setVigencia(boolean vigencia) {
        this.vigencia = vigencia;
    }
    
     public String getNombresCompletos() {
        return this.nombres + " " + this.apellidosPaterno + " " + this.apellidosMaterno;
    }
       
}
