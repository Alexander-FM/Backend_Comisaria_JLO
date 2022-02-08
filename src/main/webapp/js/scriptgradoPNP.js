const table = $('table#TablaGrado');
$(document).ready(function () {
    let grado = $("#grado_pnp").val();
    if (grado !== 'Coronel' && grado !== 'Mayor') {
        location.href = '../vistas/forbidden.jsp';
    }
    let li_grupo_registros = $('#li_grupo_registros');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_gradopnp').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    cargarTabla();
});

function cargarTabla() {
    $.get('http://localhost:9090/api/grado/todos', {}, r => {
        let tabla = '';
        r.body.forEach(g => {
            tabla += '<tr>';
            tabla += '<td>' + g.id + '</td>';
            tabla += '<td>' + g.nombreGrado + '</td>';
            tabla += '<td style=\"text-align: center\">' + (g.vigencia === true ? '<h5><span class =\"badge badge-success\">Si</span></h5>' : '<h5><span class =\"badge badge-danger\">No</span></h5>') + '</td>';
            tabla += '<td nowrap style=\"text-align: center\">' + '<button onclick="activar_desactivar(' + g.id + ')" class="btn btn-' + (g.vigencia ? 'danger' : 'success') + '"><i class="fas fa-power-off"></i></button> ' + '<button onclick="presentarDatos(' + g.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
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
        let datos = {
            nombreGrado: $('#nombreGrado').val(), vigencia: ($('#estadoGrado').is(":checked"))
        };
        $.ajax({
            type: (id === 0 ? 'post' : 'put'), url: url, data: JSON.stringify(datos), headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: xhr => {
                let data = xhr.responseJSON
                switch (xhr.status) {
                    case 200: {
                        alertify.success(data.message + '😀');
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                        break;
                    }
                    case 400: {
                        alertify.warning(data.message + ' ☹');
                        break;
                    }
                    case 500: {
                        alertify.error(data.message);
                    }
                }
            },
        });
    } else {
        alertify.warning('complete todos los campos');
    }
}

function presentarDatos(id) {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/grado/' + id, data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, complete: xhr => {
            let data = xhr.responseJSON
            switch (xhr.status) {
                case 302: {
                    $('#idG').val(data.body.id);
                    $('#nombreGrado').val(data.body.nombreGrado);
                    $("#estadoGrado").prop('checked', data.body.vigencia);
                }
                    break;
                case 404: {
                    alertify.warning(data.message + ' ☹');
                }
                    break;
                case 500: {
                    alertify.error(data.message);
                }
                    break;
            }
        }
    });
    $('#modal-lg').modal();
    $('#btnSave').html('<i class="fas fa-save"></i> Actualizar Grado PNP');
}

function activar_desactivar(id) {
    alertify.confirm('cambio de estado', 'esta seguro que desea activar/desactivar este grado?', () => {
        $.ajax({
            type: 'get', url: 'http://localhost:9090/api/grado/turn/' + id, data: {}, headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: xhr => {
                let data = xhr.responseJSON
                switch (xhr.status) {
                    case 200: {
                        alertify.success(data.message + '😀')
                        setTimeout(function () {
                            location.reload();
                        }, 2000)
                        break;
                    }
                    case 404: {
                        alertify.warning(data.message)
                        break;
                    }
                    case 500: {
                        alertify.error(data.message)
                        break;
                    }
                }
            }
        });
    }, () => {
        alertify.notify('operación cancelada');
    }).set('labels', {ok: 'si', cancel: 'no'});
}

function reset() {
    $('#idG').val(0);
    $('#nombreGrado').val('');
    $("input:checkbox").prop('checked', false);
    $('#btnSave').html('<i class="fas fa-save"></i> Registrar Grado PNP');
}