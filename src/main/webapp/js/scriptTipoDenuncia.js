$(document).ready(() => {
    let li_grupo_registros = $('#li_grupo_registros');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_tipodenuncia').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    $("input:checkbox").prop('checked', false);
    cargarTabla();
});

function cargarTabla() {
    $.get('http://localhost:9090/api/tipoDenuncia/todos', {}, r => {
        if (r.rpta === 1) {
            let tabla = '';
            r.body.forEach(td => {
                tabla += '<tr>';
                tabla += '<td>' + td.id + "</td>";
                tabla += '<td>' + td.tipoDenuncia + "</td>";
                tabla += '<td style=\"text-align: center\">' + (td.estado ? '<h5><span class =\"badge badge-success\">Activo</span></h5>' : '<h5><span class =\"badge badge-danger\">Inactivo</span></h5>') + '</td>';
                tabla += '<td><button onclick="presentarDatos(' + td.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
                tabla += '</tr>';
            });
            $('#TablaTipDen').find('tbody').html(tabla);
            $('#TablaTipDen').dataTable();
        } else {
            alert('el servicio no ha devolvido ningun dato,refresque la página o intentelo más tarde');
        }
    });
}

function registrar() {
    if ($('#nomTipDen').val().trim() !== '') {
        let id = parseInt($('#idTD').val());
        let url = 'http://localhost:9090/api/tipoDenuncia' + (id !== 0 ? ('/' + id) : '');
        let datos = {
            tipoDenuncia: $('#nomTipDen').val(), estado: ($('#estadoTipDen').is(':checked'))
        };
        $.ajax({
            type: (id === 0 ? 'post' : 'put'), url: url, data: JSON.stringify(datos), headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: xhr => {
                let data = xhr.responseJSON
                switch (xhr.status) {
                    case 200: {
                        alertify.success(data.message + ' 😀');
                        setTimeout(() => {
                            location.reload();
                        }, 1500)
                        break;
                    }
                    case 400: {
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
    } else {
        alert('por favor llene todos los campos');
    }
}

function presentarDatos(id) {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/tipoDenuncia/' + id, data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, complete: xhr => {
            let data = xhr.responseJSON;
            switch (xhr.status) {
                case 302: {
                    $('#idTD').val(data.body.id);
                    $('#nomTipDen').val(data.body.tipoDenuncia);
                    $('#estadoTipDen').prop('checked', data.body.estado);
                    break;
                }
                case 404: {
                    alertify.warning(data.message + ' ☹');
                    break;
                }
                case 500: {
                    alertify.error(data.me)
                }
            }
        }
    });
    $('#modal-lg').modal({backdrop: 'static', keyboard: false});
    $('#btnSave').html('<i class="fas fa-save"></i> Actualizar Tipo Denuncia');
}
function reset() {
    $('#idTD').val(0);
    $('#nomTipDen').val('');
    $("input:checkbox").prop('checked', false);
    $('#btnSave').html('<i class="fas fa-save"></i> Registrar Tipo Denuncia');
}