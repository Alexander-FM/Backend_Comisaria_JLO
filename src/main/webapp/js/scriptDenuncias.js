var tabla = $("table#TablaDenuncias"),
    tablaAgraviados = $("table#tabla_agraviados"),
    tablaDenunciados = $("table#tabla_denunciados"),
    mdlDd = $("#modal-dd"),
    mdlMp = $("#modal-mapa"),
    mdlEmail = $("#modal-correo"),
    mdlAd = $("#modal-ac"),
    btnSave = $("#btn-save");
$(document).ready(function () {
    let li_grupo_registros = $('#li_grupo_recdenuncias');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_verdenuncias').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    tabla.on("click", ".btn-info", function () {
        var id = $(this).parents("tr").children()[0].textContent;
        leerDenuncia(id);
        mdlDd.modal({backdrop: 'static', keyboard: false});
    });

    tabla.on("click", ".btn-warning", function () {
        var idDenuncia = $(this).parents("tr").children()[0].textContent;
        presentarDatos(idDenuncia);
        mdlAd.modal({backdrop: 'static', keyboard: false});
        btnSave.html('<i class="fas fa-sync-alt"></i> Actualizar Denuncia');
    });
    listarDenuncias();
    cargarPolicias();
});

function obtenerCorreo(email) {
    mdlEmail.modal({backdrop: 'static', keyboard: false});
    $('#destinatario').val(email);
}

//Enviar Correo de Denuncia Atendida
function answerRequest() {
    if ($('#destinatario').val().trim() !== ''
        && $('#titulo').val().trim() !== ''
        && $('#mensaje').val().trim() !== '') {
        let obj = {
            destinatario: $('#destinatario').val(),
            titulo: $('#titulo').val(),
            mensaje: $('#mensaje').val()
        };
        $.ajax({
            type: 'post',
            url: 'http://localhost:9090/api/denuncia/answerRequest',
            data: obj, //Cuando es parentesis es porque quieres convertirlo a json Strinfy
            success: function (data) {
                switch (data.rpta) {
                    case 1:
                        alertify.success(data.message);
                        mdlEmail.modal('hide');

                        break;
                    case 0:
                        alertify.warning(data.message + ' ☹');
                        break;
                    default :
                        alertify.error('ha ocurrido un error durante el envio ⚙, inténtelo nuevamente en unos mintos ⏲');
                        break;
                }
            }, error: function (x, y) {
                console.log(x.responseText);
            }
        });
    } else {
        alertify.error('Ooops...! Para enviar el mensaje debe completar todo los campos del formulario');
    }
}

function leerDenuncia(id) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/denuncia/detalle/' + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {}, //idD es la variable del servicio
        success: function (data) {
            if(data.rpta==1){
                var tablaA = '', tablaD = '';
                data.body.agraviados.forEach(ag => {
                    tablaA += '<tr>';
                    tablaA += '<td>' + ag.agraviado.nombres + ' ' + ag.agraviado.apellidoPaterno + ' ' + ag.agraviado.apellidoMaterno + '</td>';
                    tablaA += '<td>' + ag.agraviado.telefono;
                    tablaA += '<td>' + ag.agraviado.informacionAdicional.nombre + '</td>';
                    tablaA += '<td>' + ag.agraviado.rhd + '</td>';
                    tablaA += '<td>' + (ag.agraviado.medidaProteccion ? 'si' : 'no') + '</td>';
                    tablaA += '<td>' + (ag.agraviado.medidaProteccion ? ag.agraviado.juzgado : 'no data ') + '</td>';
                    tablaA += '<td>' + (ag.agraviado.medidaProteccion ? formaterFecha(ag.agraviado.fechaEmision) : 'no data ') + '</td>';
                    tablaA += '<td>' + (ag.agraviado.medidaProteccion ? ag.agraviado.detalleProteccion : 'no data ') + '</td>';
                    tablaA += '</tr>';
                    debugger;
                    tablaAgraviados.find("tbody").html(tablaA);
                    tablaAgraviados.DataTable();
                });
                data.body.denunciados.forEach(den => {
                    tablaD += '<tr>';
                    tablaD += '<td>' + den.denunciado.nombres + ' ' + den.denunciado.apellidoPaterno + ' ' + den.denunciado.apellidoMaterno + '</td>';
                    tablaD += '<td>' + den.denunciado.numeroIdentificacion + '</td>';
                    tablaD += '<td>' + den.denunciado.tipoIdentificacion.tipoIdentificacion + '</td>';
                    tablaD += '<td>' + den.denunciado.informacionAdicional.nombre + '</td>';
                    tablaD += '</tr>';
                    tablaDenunciados.find("tbody").html(tablaD);
                    tablaDenunciados.DataTable();
                });
            }

        }, error: function (x, y) {
            console.log(x.responseText);
        }
    });
}

function formaterFecha(timestamp) {
    var datetime = new Date(timestamp);
    var dia = datetime.getDate();
    var mes = datetime.getMonth() + 1;
    var anio = datetime.getFullYear();

    var fecha = concatenarCero([dia, mes, anio]);
    var fecha_string = fecha[0] + '-' + fecha[1] + '-' + fecha[2];

    var horas = datetime.getHours();
    var minutos = datetime.getMinutes();
    var segundos = datetime.getSeconds();

    var hora = concatenarCero([horas, minutos, segundos]);
    var hora_string = hora[0] + ':' + hora[1] + ':' + hora[2];

    return fecha_string + ' ' + hora_string;
}

function concatenarCero(numeros) {
    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i] < 10)
            numeros[i] = "0" + numeros[i];
    }
    return numeros;
}

function registrar() {
    if ($('#codDenuncia').val().trim() !== '') {
        let id = parseInt($('#idD').val());
        let url = 'http://localhost:9090/api/denuncia/' + (id === 0 ? 'registrar' : id);
        let data = {
            cod_denuncia: $('#codDenuncia').val(),
            estadoDenuncia: ($('#estadoDenuncia').is(':checked')),
            policia: {id: parseInt($('#combo_policias').val())},
            fechaDenuncia: $('#fechaDenuncia').val(),
            horaDenuncia: $('#horaDenuncia').val(),
            fechaHechos: $('#fechaHechos').val(),
            horaHechos: $('#horaHechos').val(),
            direccion: $('#direccion').val(),
            referenciaDireccion: $('#referenciadireccion').val(),
            latitud: $('#latitud').val(),
            longitud: $('#longitud').val(),
            distrito: {id: parseInt($('#distritoId').val())},
            tipoDenuncia: {id: parseInt($('#tipoDenunciaId').val())},
            vinculoParteDenunciada: {id: parseInt($('#vPDId').val())},
            usuario: {id: parseInt($('#userId').val())},
            comisarias: {id: parseInt($('#comisariaId').val())}
        };
        $.ajax({
            type: (id === 0 ? 'post' : 'put'),
            url: url,
            data: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (data) {
                switch (data.rpta) {
                    case 1:
                        alertify.success(data.message + ' 😀');
                        setTimeout(function () {
                            location.reload();
                        }, 1500)
                        break;
                    case 0:
                        alertify.warning(data.message + ' ☹');
                        break;
                    default :
                        alertify.error('ha ocurrido un error durante el registro ⚙,inténtelo nuevamente en unos mintos ⏲');
                        break;
                }


            }, error: function (x, y) {
                alertify.error('el servicio no esta disponible,vuelva a intentarlo más tarde');
                //console.log(x.responseText);
            }
        });
    } else {
        alert('por favor llene todos los campos');
    }
}

function presentarDatos(id) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/denuncia/' + id,
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            switch (data.rpta) {
                case 1:
                    $('#idD').val(data.body.id);
                    $('#codDenuncia').val(data.body.cod_denuncia);
                    $("#estadoDenuncia").prop('checked', data.body.estadoDenuncia);
                    let item = '<option value="' + data.body.policia.id + '" selected>' + (data.body.policia.nombres + ' ' + data.body.policia.apellidos) + '</option>';
                    $('#combo_policias').val(data.body.policia.id);
                    if (!data.body.policia.estado) {
                        var alerta = alertify.warning('Alerta: Esta intentando actualizar una denuncia cuyo policía está desactivado, si desea asignarle ese mismo policia usted debe activarlo primero desde el módulo de policías', 0);
                        $('body').one('click', function () {
                            alerta.dismiss();
                        });
                    }
                    $('#fechaDenuncia').val(data.body.fechaDenuncia);
                    $('#horaDenuncia').val(data.body.horaDenuncia);
                    $('#fechaHechos').val(data.body.fechaHechos);
                    $('#horaHechos').val(data.body.horaHechos);
                    $('#direccion').val(data.body.direccion);
                    $('#referenciadireccion').val(data.body.referenciaDireccion);
                    $('#distritoId').val(data.body.distrito.id);
                    $('#tipoDenunciaId').val(data.body.tipoDenuncia.id);
                    $('#vPDId').val(data.body.vinculoParteDenunciada.id);
                    $('#userId').val(data.body.usuario.id);
                    $('#comisariaId').val(data.body.comisarias.id);
                    $('#latitud').val(data.body.latitud);
                    $('#longitud').val(data.body.longitud);
                    break;
                case 0:
                    alertify.warning(data.message + ' ☹');
                    break;
                default :
                    alert('ha ocurrido un error durante la búsqueda ⚙,inténtelo nuevamente en unos mintos ⏲');
                    break;
            }
        }, error: function (x, y) {
            alertify.error('el servicio no esta disponible,vuelva a intentarlo más tarde');
            //console.log(x.responseText);
        }
    });
}

function listarDenuncias() {
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/denuncia/porComisaria/' + $("#idComisaria").val(),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            //console.log(data.body);
            if (data.rpta === 1) {
                var tpl = '';
                data.body.forEach(d => {
                    tpl += '<tr>';
                    tpl += '<td>' + d.id + '</td>';
                    tpl += '<td>' + d.tipoDenuncia.tipoDenuncia + '</td>';
                    tpl += '<td>' + d.cod_denuncia + '</td>';
                    tpl += '<td nowrap>' + d.fechaDenuncia + '</td>';
                    tpl += '<td nowrap>' + d.horaDenuncia + '</td>';
                    tpl += '<td nowrap>' + d.fechaHechos + '</td>';
                    tpl += '<td nowrap>' + d.horaHechos + '</td>';
                    tpl += '<td>' + d.usuario.nombres + ' ' + d.usuario.apellidoPaterno + ' ' + d.usuario.apellidoMaterno + '</td>';
                    tpl += '<td>' + d.policia.nombres + ' ' + d.policia.apellidoPaterno + ' ' + d.policia.apellidoMaterno + '</td>';
                    tpl += '<td>' + d.distrito.distrito + '</td>';
                    tpl += '<td>' + d.direccion + '</td>';
                    tpl += '<td>' + d.referenciaDireccion + '</td>';
                    tpl += '<td style=\"text-align: center\">' + (d.estadoDenuncia === true ? '<h5><span class =\"badge badge-success\">Diligenciada</span></h5>' : '<h5><span class =\"badge badge-danger\">Pendiente</span></h5>') + '</td>';
                    tpl += '<td nowrap style=\"text-align: center\">'
                        + '<button title="Editar" class="btn btn-info"><i class="fas fa-plus"></i></button> '
                        + '<button title="Enviar Correo" onclick="obtenerCorreo(\'' + d.usuario.correo + '\')" class="btn btn-dark"><i class="fas fa-envelope-square"></i></button> '
                        + '<button onclick="ExportarDenuncia(' + d.id + ')" title="Exportar Denuncia" class="btn btn-primary"><i class="fas fa-scroll"></i></button> '
                        + '<button onclick="mostrarMapa(' + d.longitud + ',' + d.latitud + ')" title="Ver Mapa" class="btn btn-secondary"><i class="fas fa-map-marked-alt"></i></button> '
                        + '<button class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
                    tpl += '</tr>';
                });
                tabla.find("tbody").html(tpl);
                tabla.DataTable();
            }
            //$('#CuerpoTablaDenuncias').html(tpl);
            // $("#TablaDenuncias").DataTable();
        }, error: function (x, y) {
            console.log(x.responseText);
        }
    });
}

function reporte() {
    $.get('http://localhost:9090/api/denuncia', {}, function (r) {
        $('#lista').val(JSON.stringify(r.body));
        $('#frmReporte').submit();
    });

}

function ExportarDenuncia(id) {
    $.get('http://localhost:9090/api/denuncia/devolverDenuncia/' + id, {}, function (r) {
        $('#denuncia').val(JSON.stringify(r.body));
        $('#frmExportarDenuncia').submit();
    });
}

function cargarPolicias() {
    var combo = '';
    $.get('http://localhost:9090/api/policia', {}, function (r) {
        r.body.forEach(p => {
            combo += '<option value="' + p.id + '">' + p.nombres + ' ' + p.apellidoPaterno + ' ' + p.apellidoMaterno + '</option>';
            $('#combo_policias').html(combo);
        });
    });
}

function mostrarMapa(longitud, latitud) {
    mdlMp.modal({backdrop: 'static', keyboard: false});
    const uluru = {lat: latitud, lng: longitud};
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}