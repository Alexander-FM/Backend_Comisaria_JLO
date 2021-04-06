var table = $('table#TablaGrado');
$(document).ready(function () {
    $("input:checkbox").prop('checked', false);
    cargarTabla();
});
function cargarTabla() {
    $.get('http://localhost:9090/api/grado/todos', {}, function (r) {
        var tabla = '';
        r.body.forEach(g => {
            tabla += '<tr>';
            tabla += '<td>' + g.id + '</td>';
            tabla += '<td>' + g.nombreGrado + '</td>';
            tabla += '<td style=\"text-align: center\">' + (g.vigencia === true ? '<h5><span class =\"badge badge-success\">Si</span></h5>' : '<h5><span class =\"badge badge-danger\">No</span></h5>') + '</td>';
            tabla += '<td nowrap style=\"text-align: center\">'
                    + '<button onclick="activar_desactivar(' + g.id + ')" class="btn btn-' + (g.vigencia ? 'danger' : 'success') + '"><i class="fas fa-power-off"></i></button> '
                    + '<button onclick="presentarDatos(' + g.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
            tabla += '</tr>';
        });
        table.find('tbody').html(tabla);
        table.DataTable();
    });
}
function registrar() {
    if ($('#nombreGrado').val().trim() !== '') {
        let id = parseInt($('#idG').val());
        let url = 'http://localhost:9090/api/grado' + (id !== 0 ? ('/' + id) : '');
        debugger;
        let data = {
            nombreGrado: $('#nombreGrado').val(),
            vigencia: ($('#estadoGrado').is(":checked"))
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
                        alertify.success('grado ' + (id === 0 ? 'registrado' : 'actualizado') + '😀');
                        setTimeout(function () {
                            location.reload();
                        }, 2000);

                        break;
                    case 0:
                        alertify.warning(data.body + ' ☹');
                        break;
                    default :
                        alert('ha ocurrido un error durante el registro ⚙,inténtelo nuevamente en unos mintos ⏲');
                        break;
                }
            }, error: function (x, y) {
                alertify.error('el servicio no esta disponible,vuelva a intentarlo más tarde');
                //console.log(x.responseText);
            }
        });
    } else {
        alertify.warning('complete todos los campos');
    }
}
;
function presentarDatos(id) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/grado/' + id,
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            switch (data.rpta) {
                case 1:
                    $('#idG').val(data.body.id);
                    $('#nombreGrado').val(data.body.nombreGrado);
                    $("#estadoGrado").prop('checked', data.body.vigencia);
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
    $('#modal-lg').modal();
    $('#btnSave').html('<i class="fas fa-save"></i> Actualizar Grado PNP');
}
function activar_desactivar(id) {
    alertify.confirm('cambio de estado', 'esta seguro que desea activar/desactivar este grado?', function () {
        $.ajax({
            type: 'get',
            url: 'http://localhost:9090/api/grado/turn/' + id,
            data: {},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (data) {
                switch (data.rpta) {
                    case 1:
                        alertify.success('Grado Desactivado/Activado 😀')
                        setTimeout(function () {
                            location.reload();
                        }, 2000)

                        break;
                    case 0:
                        alertify.warning(data.body + ' ☹');
                        break;
                    default :
                        alert('ha ocurrido un error durante la elimninación ⚙,inténtelo nuevamente en unos mintos ⏲');
                        break;
                }
            }, error: function (x, y) {
                alertify.error('el servicio no esta disponible,vuelva a intentarlo más tarde');
                //console.log(x.responseText);
            }
        });
    }, function () {
        alertify.warning('operación cancelada');
    }).set('labels', {ok: 'si', cancel: 'no'});
}
function reset() {
    $('#idVPD').val(0);
    $('#nombreGrado').val('');
    $("input:checkbox").prop('checked', false);
    $('#btnSave').html('<i class="fas fa-save"></i> Registrar Grado PNP');
}