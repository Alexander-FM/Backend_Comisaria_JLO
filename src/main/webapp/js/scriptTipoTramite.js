$(document).ready(function () {
    let li_grupo_registros = $('#li_grupo_registros');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_tipotramite').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    $("input:checkbox").prop('checked', false);
    cargarTabla();
});

function cargarTabla() {
    $.get('http://localhost:9090/api/tipoTramite/todos', {}, function (r) {
        if (r.rpta === 1) {
            var tabla = '';
            r.body.forEach(tt => {
                tabla += '<tr>';
                tabla += '<td>' + tt.id + "</td>";
                tabla += '<td>' + tt.tipoTramite + "</td>";
                tabla += '<td style=\"text-align: center\">' + (tt.estado ? '<h5><span class =\"badge badge-success\">Activo</span></h5>' : '<h5><span class =\"badge badge-danger\">Inactivo</span></h5>') + '</td>';
                tabla += '<td><button onclick="presentarDatos(' + tt.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
                tabla += '</tr>';
            });
            $('#TablaTipoTramite').find('tbody').html(tabla);
            $('#TablaTipoTramite').dataTable();
        } else {
            alert('el servicio no ha devolvido ningun dato,refresque la página o intentelo más tarde');
        }
    });
}
function registrar() {
    if ($('#nombreTramite').val().trim() !== '') {
        let id = parseInt($('#idTT').val());
        let url = 'http://localhost:9090/api/tipoTramite' + (id !== 0 ? ('/' + id) : '');
        let data = {
            tipoTramite: $('#nombreTramite').val(), estado: ($('#estadoTramite').is(':checked'))
        };
        $.ajax({
            type: (id === 0 ? 'post' : 'put'), url: url, data: JSON.stringify(data), headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, success: function (data) {
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
                        alert('ha ocurrido un error durante el registro ⚙,inténtelo nuevamente en unos mintos ⏲');
                        break;
                }


            }, error: function (x, y) {
                alert('el servicio no esta disponible,vuelva a intentarlo más tarde');
                //console.log(x.responseText);
            }
        });
    } else {
        alert('por favor llene todos los campos');
    }
}
function presentarDatos(id) {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/tipoTramite/' + id, data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, success: function (data) {
            switch (data.rpta) {
                case 1:
                    $('#idTT').val(data.body.id);
                    $('#nombreTramite').val(data.body.tipoTramite);
                    $('#estadoTramite').prop('checked', data.body.estado);
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
    $('#modal-lg').modal();
    $('button#btnSave').html('<i class="fas fa-save"></i> Actualizar Tipo Trámite');
}