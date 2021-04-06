$(document).ready(function () {
    var tablaTramite = $("table#TablaTramites"),
            modalAt = $("#modal-at");
    /*tablaTramite.on("click", ".btn-warning", function () {
     var idTramite = $(this).parents("tr").children()[0].textContent;
     //Crear function para actualizar los datos del trámite.
     modalAt.modal({backdrop: 'static', keyboard: false});
     });*/

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
    ;
    function cargarTabla() {
        $.get('http://localhost:9090/api/tramite', {}, function (r) {
            var tabla = '';
            r.body.forEach(t => {
                tabla += '<tr>';
                tabla += '<td style="text-align:center">' + t.id + '</td>';
                tabla += '<td style="text-align:center">' + t.codTramite + '</td>';
                tabla += '<td style="text-align:center">' + formaterFecha(t.fechaDenuncia) + '</td>';
                tabla += '<td style="text-align:center">' + t.policia.nombres + '</td>';
                tabla += '<td style="text-align:center">' + t.tipoTramite.tipoTramite + '</td>';
                tabla += '<td style=\"text-align: center\">' + (t.estadoTramite === true ? '<h5><span class =\"badge badge-success\">Diligenciada</span></h5>' : '<h5><span class =\"badge badge-danger\">Pendiente</span></h5>') + '</td>';
                tabla += '<td style="text-align:center">' + t.usuario.nombres + '</td>';
                tabla += '<td nowrap style=\"text-align: center\">'
                        + '<button onclick="presentarDatos(' + t.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
                tabla += '</tr>';
            });
            //console.log(tabla);
            tablaTramite.find("tbody").html(tabla);
            tablaTramite.DataTable();
        });
    }
    ;
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
            combo += '<option value="' + p.id + '">' + p.nombres + ' ' + p.apellidos + '</option>';
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
            fechaDenuncia: $('#fechaDenuncia').val(),
            tipoTramite: {id: parseInt($('#tipoTramiteId').val())},
            usuario: {id: parseInt($('#usuarioId').val())}
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
                        alertify.success('Trámite ' + (id === 0 ? 'registrado' : 'actualizado') + ' 😀');
                        setTimeout(function () {
                            location.reload();
                        }, 1500)
                        break;
                    case 0:
                        alertify.warning(data.body + ' ☹');
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
;
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
                    let item = '<option value="' + data.body.policia.id + '" selected>' + (data.body.policia.nombres + ' ' + data.body.policia.apellidos) + '</option>'
                    $('#combo_policias_tramites').val(data.body.policia.id);
                    if (!data.body.policia.estado) {
                        var alerta = alertify.warning('Alerta: Esta intentando actualizar un trámite cuyo policía está desactivado, si desea asignarle ese mismo policia usted debe activarlo primero desde el módulo de policías', 0)
                        $('body').one('click', function () {
                            alerta.dismiss();
                        });
                    }
                    $('#fechaDenuncia').val(data.body.fechaDenuncia);
                    $('#usuarioId').val(data.body.usuario.id);
                    $('#tipoTramiteId').val(data.body.tipoTramite.id);
                    break;
                case 0:
                    alertify.warning(data.body + ' ☹');
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

