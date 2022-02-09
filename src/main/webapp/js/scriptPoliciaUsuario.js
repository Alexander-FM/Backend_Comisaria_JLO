$(document).ready(() => {
    var grado = $("#grado_pnp").val();
    if (grado !== 'Coronel' && grado !== 'Mayor') {
        location.href = '../vistas/forbidden.jsp';
    }
    let li_grupo_registros = $('#li_grupo_usuarios');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_loginpnp').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    $('.select2').select2();
    cargarUsuarios();
    cargarPoliciasXDe();
    cargarComisarias();
})

function cargarUsuarios() {
    $.get('http://localhost:9090/api/LoginPnp/usuarios', {}, r => {
        if (r.rpta === 1) {
            let tabla = '';
            r.body.forEach(p => {
                tabla += '<tr>';
                tabla += '<td>' + p.id + "</td>";
                tabla += '<td>' + p.codigoPolicial + "</td>";
                tabla += '<td>' + p.clave + "</td>";
                tabla += '<td nowrap>' + (p.policia.nombres + ' ' + p.policia.apellidoPaterno + ' ' + p.policia.apellidoMaterno) + "</td>";
                tabla += '<td>' + p.comisarias.nombreComisaria + "</td>";
                tabla += '<td style="text-align: center">' + (p.estado ? '<h5><span class =\"badge badge-success\">Activo</span></h5>' : '<h5><span class =\"badge badge-danger\">Inactivo</span></h5>') + '</td>';
                tabla += '<td style="text-align: center">' + '<button onclick="presentarDatos(' + p.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button> ' + '<button onclick="activar_desactivar(' + p.id + ')" class="btn btn-' + (p.estado ? 'danger' : 'success') + '"><i class="fas fa-power-off"></i></button></td>';
                tabla += '</tr>';
            });
            $('#TablaPoliciasUsuario').find('tbody').html(tabla);
            $('#TablaPoliciasUsuario').dataTable();
        } else {
            alert('el servicio no ha devolvido ningun dato,refresque la página o intentelo más tarde');
        }
    });
}

function cargarPoliciasXDe() {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/policia/sinLogin', data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, success: data => {
            switch (data.rpta) {
                case 1:
                    let combo_policias_usuarios = '';
                    data.body.forEach(d => {
                        combo_policias_usuarios += '<option value="' + d.id + '">' + (d.nombres + ' ' + d.apellidoPaterno + ' ' + d.apellidoMaterno) + '</option>';
                    });
                    $('#combo_policias_usuarios').html(combo_policias_usuarios);
                    break;
                case 0:
                    alertify.warning(data.message + ' ☹');
                    break;
                default :
                    alert('ha ocurrido un error durante el registro ⚙,inténtelo nuevamente en unos mintos ⏲');
                    break;
            }
        }, error: () => {
            alertify.set('notifier', 'position', 'top-center');
            alertify.set('notifier', 'delay', 10);
            alertify.error('se ha intentado obtener los distritos para el formulario de registro pero ocurrió un error,por favor refresque la pagina<br>\n\
            si el problema persiste cierre la app y espere unos minutos');
            //console.log(x.responseText);
        }
    });
}

function cargarComisarias() {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/comisarias', data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, success: data => {
            switch (data.rpta) {
                case 1:
                    let comboComisarias = '';
                    data.body.forEach(e => {
                        comboComisarias += '<option value="' + e.id + '">' + e.nombreComisaria + '</option>';
                    });
                    $('#combo_policias_comisarias').html(comboComisarias);
                    break;
                case 0:
                    alertify.warning(data.message + ' ☹');
                    break;
                default :
                    alert('ha ocurrido un error durante la carga de datos ⚙,inténtelo nuevamente en unos mintos ⏲');
                    break;
            }
        }, error: function (x, y) {
            alertify.set('notifier', 'position', 'top-center');
            alertify.set('notifier', 'delay', 10);
            alertify.error('Lo sentimos, se ha intentado obtener el listado de comisarías para el formulario de login, pero ocurrió un error, por favor refresque la pagina<br>\n\
            si el problema persiste cierre la app y espere unos minutos');
            //console.log(x.responseText);
        }
    });
}

function registrar() {
    if ($('#codUsuario').val().trim() !== '' || $('#claveUsuario').val().trim() !== '') {
        let id = parseInt($('#idU').val());
        let url = 'http://localhost:9090/api/LoginPnp/' + (id === 0 ? 'registrar' : id);
        let datos = {
            codigoPolicial: $('#codUsuario').val(),
            clave: $('#claveUsuario').val(),
            policia: {id: parseInt($('#combo_policias_usuarios').val())},
            estado: ($('#estadoPol').is(":checked")),
            comisarias: {id: parseInt($('#combo_policias_comisarias').val())}
        };
        $.ajax({
            type: (id === 0 ? 'post' : 'put'), url: url, data: JSON.stringify(datos), headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: xhr => {
                let data = xhr.responseJSON;
                switch (xhr.status) {
                    case 200: {
                        alertify.success(data.message + '😀');
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                        break;
                    }
                    case 400: {
                        alertify.warning(data.message + ' ☹');
                        break;
                    }
                    case 500: {
                        alertify.error(data.message)
                        break;
                    }
                }
            }
        });
    } else {
        alertify.warning('complete todos los campos');
    }
}

function presentarDatos(id) {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/LoginPnp/' + id, data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, complete: xhr => {
            let data = xhr.responseJSON
            switch (xhr.status) {
                case 302: {
                    $('#idU').val(data.body.id);
                    $('#codUsuario').val(data.body.codigoPolicial);
                    $('#claveUsuario').val(data.body.clave);
                    let item = '<option value="' + data.body.policia.id + '" selected>' + (data.body.policia.nombres + ' ' + data.body.policia.apellidoPaterno + ' ' + data.body.policia.apellidoMaterno) + '</option>';
                    $('#combo_policias_usuarios').append(item);
                    //$('#combo_policias_usuarios').val(data.body.policia.nombres);
                    $("#estadoPol").prop('checked', data.body.estado);
                    $('#combo_policias_comisarias').val(data.body.comisarias.id).trigger('change');
                    //PLUS
                    $('#combo_policias_usuarios').attr('disabled', '')
                    $('#etiqueta').html('Usted está actualizando el usuario del policía:')
                    $('#modal-lg').modal({backdrop: 'static', keyboard: false});
                    $('#btn').html('<i class="fas fa-sync-alt"></i> Actualizar Usuario');
                    break;
                }
                case 404: {
                    alertify.warning(data.message + ' ☹');
                    break;
                }
                case 500: {
                    alertify.error(data.message)
                    break;
                }
            }
        }
    });
}

function activar_desactivar(id) {
    alertify.confirm('Cambio de Estado', '¿Está seguro que desea activar/desactivar este usuario?', () => {
        $.ajax({
            type: 'get', url: 'http://localhost:9090/api/LoginPnp/turn/' + id, data: {}, headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: xhr => {
                switch (xhr.status) {
                    case 200: {
                        alertify.success('Usuario Desactivado/Activado 😀')
                        setTimeout(() => {
                            location.reload();
                        }, 1000)
                        break;
                    }
                    case 404: {
                        alertify.warning(data.message + ' ☹');
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
        alertify.notify('Operación Cancelada');
    }).set('labels', {ok: 'Sí', cancel: 'No'});
}

function reset() {
    $('#idU').val(0);
    $('#codUsuario').val('');
    $('#claveUsuario').val('');
    $('#combo_policias_usuarios').val('').trigger('change');
    $('#combo_policias_usuarios').removeAttr('disabled')
    cargarPoliciasXDe()
    $('#combo_policias_comisarias').val('').trigger('change');
    $("input:checkbox").prop('checked', false);
    $('#btn').html('<i class="fas fa-save"></i> Registrar Usuario');
}