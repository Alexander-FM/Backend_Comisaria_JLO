$(document).ready(() => {
    const DOM = {
        frmLogin: $("#frmLogin"),
        frmSolicitarCambio: $("#frmSolicitarCambioClave"),
        frmChangePassword: $("#frmChangePassword"),
        txtCodPolicia: $("input#codPolicia"),
        txtCodPolicial: $("input#codigoPolicial"),
        txtClave: $("input#clave"),
        modalSolicitud: $("#modal-lg"),
        clave1: $("#pass1"),
        clave2: $("#pass2"),
        modalChangePass: $("#modal-changePass"),
        alert: $("a#contenedor")
    };
    DOM.frmLogin.on("submit", (e) => {
        e.preventDefault();
        ingresarSistema();
    });

    DOM.frmSolicitarCambio.on("submit", (e) => {
        e.preventDefault();
        buscarPoliciaByCP();
    });

    DOM.frmChangePassword.on("submit", (e) => {
        e.preventDefault();
        changePassword();
    });

    function ingresarSistema() {
        let obj = {
            cp: DOM.txtCodPolicia.val(), //Las propiedades deben coincidir con las de la clase
            cl: DOM.txtClave.val()
        };
        console.log(JSON.stringify(obj));
        $.ajax({
            type: 'post', url: 'http://localhost:9090/api/LoginPnp', data: JSON.stringify(obj), headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: xhr => {
                let data = xhr.responseJSON
                switch (xhr.status) {
                    case 200: {
                        if (data.rpta === 1) {
                            DOM.alert[0].textContent = data.message;
                            $.post("srvLogin?accion=asignarSesion", {
                                data: JSON.stringify(data.body.policia),
                                idC: data.body.comisarias.id,
                                nomComisaria: data.body.comisarias.nombreComisaria,
                                codPolicial: data.body.codigoPolicial
                            });

                            setTimeout(() => {
                                window.location.href = "vistas/inicio.jsp";

                            }, 1500);
                        } else {
                            DOM.alert[0].textContent = data.message;
                        }
                        break;
                    }
                    case 500: {
                        alertify.error(data.message);
                        break;
                    }
                }
            },
        });
    }

    function buscarPoliciaByCP() {
        let obj = {
            codigoPolicial: DOM.txtCodPolicial.val()
        };
        $.ajax({
            type: 'post', url: 'http://localhost:9090/api/LoginPnp/eByCp', data: obj, complete: xhr => {
                let data = xhr.responseJSON
                switch (xhr.status) {
                    case 302:
                        DOM.modalSolicitud.modal('hide');
                        DOM.modalChangePass.modal('show');
                        $("#cp").val(obj.codigoPolicial);
                        DOM.txtCodPolicial.val("");
                        alertify.success(data.message);
                        break
                    case 404:
                        alertify.warning(data.message)
                        DOM.modalSolicitud.modal('hide');
                        break
                    case 500:
                        alertify.error(data.message)
                        DOM.modalSolicitud.modal('hide');
                        break;

                }
            }
        });
    }

    function changePassword() {
        let obj = {
            cp: $('#cp').val(), clave: $('#pass1').val()
        };
        if (DOM.clave1.val() === DOM.clave2.val()) {
            $.ajax({
                type: 'post',
                url: 'http://localhost:9090/api/LoginPnp/changePasswordLoginPnp',
                data: (obj),
                complete: xhr => {
                    let data = xhr.responseJSON
                    switch (xhr.status) {
                        case 200: {
                            DOM.modalChangePass.modal('hide');
                            alertify.success(data.message);
                            $('#pass1').val("");
                            $('#pass2').val("");
                        }
                            break
                        case 404: {
                            DOM.modalChangePass.modal('show');
                            alertify.warning(data.message);
                        }
                            break
                        case 500: {
                            alertify.error(data.message)
                        }
                            break
                    }
                },
            });
        } else {
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Las contraseñas nos coinciden, intente otra vez!'
            });
            $('#pass1').val("");
            $('#pass2').val("");
        }
    }
});

