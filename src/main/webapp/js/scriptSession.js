$(document).ready(function () {
    var DOM = {
        frmLogin: $("#frmLogin"),
        txtCodPolicia: $("input#codPolicia"),
        txtClave: $("input#clave"),
        comboComisaria: $("#combo_comisarias"),
        alert: $("a#contenedor")
    };
    DOM.frmLogin.on("submit", function (e) {
        e.preventDefault();
        ingresarSistema();
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
                    $.post("srvLogin?accion=asignarSesion", {data: JSON.stringify(data.body.policia), idC: DOM.comboComisaria.val()});
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
    cargarComisarias();
});

function cargarComisarias() {
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/comisarias',
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            switch (data.rpta) {
                case 1:
                    let comboComisarias = '';
                    data.body.forEach(e => {
                        comboComisarias += '<option hidden selected>Seleccione Comisaría</option>';
                        comboComisarias += '<option value="' + e.id + '">' + e.nombreComisaria + '</option>';
                    });
                    $('#combo_comisarias').html(comboComisarias);
                    break;
                case 0:
                    alertify.warning(data.body + ' ☹');
                    break;
                default :
                    alert('ha ocurrido un error durante la carga de datos ⚙,inténtelo nuevamente en unos mintos ⏲');
                    break;
            }
        }, error: function (x, y) {
            alertify.set('notifier', 'position', 'top-center');
            alertify.set('notifier', 'delay', 10);
            alertify.error('se ha intentado obtener los grados para el formulario de registro pero ocurrió un error,por favor refresque la pagina<br>\n\
            si el problema persiste cierre la app y espere unos minutos');
            //console.log(x.responseText);
        }
    });
}

