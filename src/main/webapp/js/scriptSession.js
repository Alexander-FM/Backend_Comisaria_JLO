$(document).ready(function () {
    var DOM = {
        frmLogin: $("#frmLogin"),
        txtCodPolicia: $("input#codPolicia"),
        txtClave: $("input#clave"),
        alert: $("a#contenedor")
    };
    DOM.frmLogin.on("submit", function (e) {
        e.preventDefault();
        ingresarSistema();
    });

    function ingresarSistema() {
        var obj = {
            cp: DOM.txtCodPolicia.val(),//Las propiedades deben coincidir con las de la clase
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
                    $.post("srvLogin?accion=asignarSesion",{data:JSON.stringify(data.body.policia)});
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

});

