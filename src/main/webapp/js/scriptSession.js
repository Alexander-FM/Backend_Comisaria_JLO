$(document).ready(function () {
    var DOM = {
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
    DOM.frmLogin.on("submit", function (e) {
        e.preventDefault();
        ingresarSistema();
    });

    DOM.frmSolicitarCambio.on("submit", function (e) {
        e.preventDefault();
        buscarPoliciaByCP();
    });

    DOM.frmChangePassword.on("submit", function (e) {
        e.preventDefault();
        changePassword();
    });

    function ingresarSistema() {
        var obj = {
            cp: DOM.txtCodPolicia.val(), //Las propiedades deben coincidir con las de la clase
            cl: DOM.txtClave.val()};
        console.log(JSON.stringify(obj));
        $.ajax({
            type: 'post',
            url: 'http://localhost:9090/api/LoginPnp',
            data: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (data) {
                //alert(data.rpta);
                if (data.rpta === 1) {
                    DOM.alert[0].textContent = data.message;
                    $.post("srvLogin?accion=asignarSesion", {data: JSON.stringify(data.body.policia), idC: data.body.comisarias.id, nomComisaria: data.body.comisarias.nombreComisaria});

                    setTimeout(function () {
                        window.location.href = "vistas/inicio.jsp";

                    }, 1500);
                } else {
                    DOM.alert[0].textContent = data.message;
                }
            }, error: function (x, y) {
                alertify.error('el servicio no esta disponible,vuelva a intentarlo más tarde');
                //console.log(x.responseText);
            }
        });
    }

    function buscarPoliciaByCP() {
        var obj = {
            codigoPolicial: DOM.txtCodPolicial.val()};
        console.log(JSON.stringify(obj));
        $.ajax({
            type: 'post',
            url: 'http://localhost:9090/api/LoginPnp/eByCp',
            data: (obj),
            success: function (data) {
                if (data.body) {
                    DOM.modalSolicitud.modal('hide');
                    DOM.modalChangePass.modal('show');
                    $("#cp").val(obj.codigoPolicial);
                    DOM.txtCodPolicial.val("");
                    alertify.success(data.message);
                } else {
                    DOM.modalChangePass.modal('hide');
                    alertify.error(data.message);
                }
            }, error: function (x, y) {
                alertify.error('No se puedo conectar con el servidor');
            }
        });
    }

    function changePassword() {
        var obj = {
            cp: $('#cp').val(),
            clave: $('#pass1').val()};
        if (DOM.clave1.val() === DOM.clave2.val()) {
            $.ajax({
                type: 'post',
                url: 'http://localhost:9090/api/LoginPnp/changePasswordLoginPnp',
                data: (obj),
                success: function (data) {
                    if (data.rpta === 1) {
                        DOM.modalChangePass.modal('hide');
                        alertify.success(data.message);
                        $('#pass1').val("");
                        $('#pass2').val("");
                    } else {
                        DOM.modalChangePass.modal('show');
                        alertify.error(data.message);
                    }
                }, error: function (x, y) {
                    alertify.error('No se puedo conectar con el servidor');
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas nos coinciden, intente otra vez!'
            });
            $('#pass1').val("");
            $('#pass2').val("");
        }
    }
});

