const tabla = $("table#TablaDenuncias"), tablaAgraviados = $("table#tabla_agraviados"),
    tablaDenunciados = $("table#tabla_denunciados"), mdlDd = $("#modal-dd"), mdlMp = $("#modal-mapa"),
    mdlEmail = $("#modal-correo"), mdlAd = $("#modal-ac"), btnSave = $("#btn-save");
$(document).ready(() => {
    let li_grupo_registros = $('#li_grupo_recdenuncias');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_verdenuncias').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    tabla.on("click", ".btn-info", function () {
        var id = $(this).parents("tr").children()[0].textContent;
        var rhd = $(this).data('rhd');
        leerDenuncia(id, rhd);
        mdlDd.modal({backdrop: 'static', keyboard: false});
    });

    tabla.on("click", ".btn-warning", function() {
        let idDenuncia = $(this).parents("tr").children()[0].textContent;
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
    if ($('#destinatario').val().trim() !== '' && $('#titulo').val().trim() !== '' && $('#mensaje').val().trim() !== '') {
        let obj = {
            destinatario: $('#destinatario').val(), titulo: $('#titulo').val(), mensaje: $('#mensaje').val()
        };
        $.ajax({
            type: 'post', url: 'http://localhost:9090/api/denuncia/answerRequest', data: obj, //Cuando es parentesis es porque quieres convertirlo a json Strinfy
            success: data => {
                switch (data.rpta) {
                    case 1:
                        Swal.fire('Mensaje del Sistema', data.message, 'success');
                        mdlEmail.modal('hide');
                        break;
                    case 0:
                        Swal.fire('Mensaje del Sistema', data.message, 'error');
                        break;
                    default :
                        Swal.fire('Mensaje del Sistema', 'ha ocurrido un error durante el envio ⚙, inténtelo nuevamente en unos mintos ⏲', 'error');
                        break;
                }
            }, error: (x) => {
                console.log(x.responseText);
            }
        });
    } else {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Debe completar todos los campos. Asegurese e intente nuevamente.'
        });
    }
}

function leerDenuncia(id, rhd) {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/denuncia/detalle/' + id, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, data: {}, //idD es la variable del servicio
        success: data => {
            if (data.rpta === 1) {
                let tablaA = '', tablaD = '';
                $("#rhd").html(rhd);
                data.body.agraviados.forEach(ag => {
                    tablaA += '<tr>';
                    tablaA += '<td>' + ag.agraviado.nombres + ' ' + ag.agraviado.apellidoPaterno + ' ' + ag.agraviado.apellidoMaterno + '</td>';
                    tablaA += '<td>' + ag.agraviado.telefono;
                    tablaA += '<td>' + ag.agraviado.informacionAdicional.nombre + '</td>';
                    tablaA += '<td>' + (ag.agraviado.medidaProteccion ? 'si' : 'no') + '</td>';
                    tablaA += '<td>' + (ag.agraviado.medidaProteccion ? ag.agraviado.juzgado : 'no data ') + '</td>';
                    tablaA += '<td>' + (ag.agraviado.medidaProteccion ? formaterFecha(ag.agraviado.fechaEmision) : 'no data ') + '</td>';
                    tablaA += '<td>' + (ag.agraviado.medidaProteccion ? ag.agraviado.detalleProteccion : 'no data ') + '</td>';
                    tablaA += '</tr>';
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
        }, error: (x) => {
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
        if (numeros[i] < 10) numeros[i] = "0" + numeros[i];
    }
    return numeros;
}

function registrar() {
    if ($('#codDenuncia').val().trim() !== '') {
        let id = parseInt($('#idD').val());
        let url = 'http://localhost:9090/api/denuncia/' + (id === 0 ? 'registrar' : id);
        let datos = {
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
            type: (id === 0 ? 'post' : 'put'), url: url, data: JSON.stringify(datos), headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: xhr => {
                let data = xhr.responseJSON
                switch (xhr.status) {
                    case 200: {
                        alertify.success(data.message + ' 😀');
                        break;
                    }
                    case 404: {
                        alertify.warning(data.message + ' ☹');
                        break;
                    }
                    case 500: {
                        alertify.error(data.message);
                        break;
                    }
                }
            }
        });
    } else {
        alert('por favor llene todos los campos');
    }
}

function presentarDatos(id) {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/denuncia/' + id, data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, complete: xhr => {
            let data = xhr.responseJSON
            switch (xhr.status) {
                case 302: {
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
                }
                case 404: {
                    alertify.warning(data.message)
                    break;
                }
                case 500: {
                    alertify.error(data.message)
                }
            }
        }
    });
}

function listarDenuncias() {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/denuncia/porComisaria/' + $("#idComisaria").val(), headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, success: data => {
            //console.log(data.body);
            if (data.rpta === 1) {
                let tpl = '';
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
                    tpl += '<td nowrap style=\"text-align: center\">' + '<button title="Ver Detalle" data-rhd="' + d.rhd + '" class="btn btn-info"><i class="fas fa-plus"></i></button> ' + '<button title="Enviar Correo" onclick="obtenerCorreo(\'' + d.usuario.correo + '\')" class="btn btn-dark"><i class="fas fa-envelope-square"></i></button> ' + '<a href="http://localhost:9090/api/denuncia/export?codDenuncia=' + d.cod_denuncia + '&idUsu=' + d.usuario.id + '" download="true"  title="Exportar Denuncia" class="btn btn-primary"><i class="fas fa-scroll"></i></a> ' + '<button onclick="mostrarMapa(' + d.longitud + ',' + d.latitud + ')" title="Ver Mapa" class="btn btn-secondary"><i class="fas fa-map-marked-alt"></i></button> ' + '<button class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
                    tpl += '</tr>';
                });
                tabla.find("tbody").html(tpl);
                tabla.DataTable();
            }
            //$('#CuerpoTablaDenuncias').html(tpl);
            // $("#TablaDenuncias").DataTable();
        }, error: (x) => {
            console.log(x.responseText);
        }
    });
}

function reporte() {
    $.get('http://localhost:9090/api/denuncia', {}, r => {
        $('#lista').val(JSON.stringify(r.body));
        $('#frmReporte').submit();
    });

}

function ExportarDenuncia(id) {
    $.get('http://localhost:9090/api/denuncia/devolverDenuncia/' + id, {}, r => {
        $('#denuncia').val(JSON.stringify(r.body));
        $('#frmExportarDenuncia').submit();
    });
}

function cargarPolicias() {
    let combo = '';
    $.get('http://localhost:9090/api/policia', {}, r => {
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
        zoom: 20, center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru, map: map,
    });
}