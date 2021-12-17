$(document).ready(function () {
    let li_grupo_registros = $('#li_grupo_rectramites');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_vertramites').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    var tablaTramite = $("table#TablaTramites"),
        modalAt = $("#modal-at");

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
    ;

    function concatenarCero(numeros) {
        for (var i = 0; i < numeros.length; i++) {
            if (numeros[i] < 10)
                numeros[i] = "0" + numeros[i];
        }
        return numeros;
    }

    function cargarTabla() {
        $.get('http://localhost:9090/api/tramite/porComisaria/' + $("#idComisaria").val(), {}, function (r) {
            var tabla = '';
            r.body.forEach(t => {
                tabla += '<tr style="text-align:center">';
                tabla += '<td>' + t.id + '</td>';
                tabla += '<td>' + t.codTramite + '</td>';
                tabla += '<td>' + t.fechaTramite + '</td>';
                tabla += '<td>' + t.horaTramite + '</td>';
                tabla += '<td>' + t.policia.nombres + ' ' + t.policia.apellidoPaterno + ' ' + t.policia.apellidoMaterno + '</td>';
                tabla += '<td>' + t.tipoTramite.tipoTramite + '</td>';
                tabla += '<td>' + (t.estadoTramite === true ? '<h5><span class =\"badge badge-success\">Diligenciada</span></h5>' : '<h5><span class =\"badge badge-danger\">Pendiente</span></h5>') + '</td>';
                tabla += '<td>' + t.solicitante + '</td>';
                tabla += '<td>' + t.usuario.nombres + '</td>';
                tabla += '<td>' + t.telefono + '</td>';
                tabla += '<td>' + t.correo + '</td>';
                tabla += '<td>' + t.motivo_denuncia_policial + '</td>';
                tabla += '<td>' + t.observaciones + '</td>';
                tabla += '<td nowrap>'
                    + '<button title="Editar Trámite" onclick="presentarDatos(' + t.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button> '
                    + '<button title="Exportar Trámite" onclick="exportarTramite(' + t.id + ')" class="btn btn-primary"><i class="fas fa-file-pdf"></i></button></td>';
                tabla += '</tr>';
            });
            //console.log(tabla);
            tablaTramite.find("tbody").html(tabla);
            tablaTramite.DataTable();
        });
    }

    cargarTabla();
    cargarPoliciasForTramites();
});

function editarTramite() {
    tablaTramite.on("click", ".btn-warning", function () {
        var idTramite = $(this).parents("tr").children()[0].textContent;
        //Crear function para actualizar los datos del trámite.
        modalAt.modal({backdrop: 'static', keyboard: false});
    });
}

function cargarPoliciasForTramites() {
    var combo = '';
    $.get('http://localhost:9090/api/policia', {}, function (r) {
        r.body.forEach(p => {
            combo += '<option value="' + p.id + '">' + p.nombres + ' ' + p.apellidoPaterno + ' ' + p.apellidoMaterno + '</option>';
        });
        $('#combo_policias_tramites').html(combo);
    });
}
;

function registrar() {
    if ($('#codTramite').val().trim() !== '') {
        let id = parseInt($('#idAC').val());
        let url = 'http://localhost:9090/api/tramite/' + (id === 0 ? 'registrar' : id);
        let data = {
            codTramite: $('#codTramite').val(),
            estadoTramite: ($('#estadotramite').is(':checked')),
            policia: {id: parseInt($('#combo_policias_tramites').val())},
            fechaTramite: $('#fechaTramite').val(),
            horaTramite: $('#horaTramite').val(),
            correo: $('#correoUser').val(),
            tipoTramite: {id: parseInt($('#tipoTramiteId').val())},
            usuario: {id: parseInt($('#usuarioId').val())},
            comisarias: {id: parseInt($('#comisariaId').val())},
            motivo_denuncia_policial: $('#motivoDenuncia').val(),
            observaciones: $('#observaciones').val(),
            solicitante: $('#solicitante').val(),
            telefono: $('#telefono').val()
        }
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
        url: 'http://localhost:9090/api/tramite/' + id,
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            switch (data.rpta) {
                case 1:
                    $('#idAC').val(data.body.id);
                    $('#codTramite').val(data.body.codTramite);
                    $("#estadotramite").prop('checked', data.body.estadoTramite);
                    let item = '<option value="' + data.body.policia.id + '" selected>' + (data.body.policia.nombres + ' ' + data.body.policia.apellidoPaterno + ' ' + data.body.policia.apellidoMaterno) + '</option>'
                    $('#combo_policias_tramites').val(data.body.policia.id);
                    if (!data.body.policia.estado) {
                        var alerta = alertify.warning('Alerta: Esta intentando actualizar un trámite cuyo policía está desactivado, si desea asignarle ese mismo policia usted debe activarlo primero desde el módulo de policías', 0)
                        $('body').one('click', function () {
                            alerta.dismiss();
                        });
                    }
                    $('#fechaTramite').val(data.body.fechaTramite);
                    $('#horaTramite').val(data.body.horaTramite);
                    $('#correoUser').val(data.body.correo);
                    $('#usuarioId').val(data.body.usuario.id);
                    $('#tipoTramiteId').val(data.body.tipoTramite.id);
                    $('#comisariaId').val(data.body.comisarias.id);
                    $('#motivoDenuncia').val(data.body.motivo_denuncia_policial);
                    $('#observaciones').val(data.body.observaciones);
                    $('#solicitante').val(data.body.solicitante);
                    $('#telefono').val(data.body.telefono);
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
    $('#modal-at').modal({backdrop: 'static', keyboard: false});
    $('#btn-save').html('<i class="fas fa-sync-alt"></i> Actualizar Trámite');
}
;

function exportarTramite(id) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/tramite/' + id,
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            $('#tramite').val(JSON.stringify(data.body));
            $('#frmPrintTramite').submit();
            $.post()
        }, error: function (x, y) {
            alertify.error('el servicio no esta disponible,vuelva a intentarlo más tarde');
            //console.log(x.responseText);
        }
    });
}

