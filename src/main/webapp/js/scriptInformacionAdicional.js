$(document).ready(() => {
    let li_grupo_registros = $('#li_grupo_registros');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_infoadic').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    cargarTabla();
});

function cargarTabla() {
    $.get('http://localhost:9090/api/informacionAdicional', {}, r => {
        if (r.rpta === 1) {
            let tabla = '';
            r.body.forEach(ia => {
                tabla += '<tr>';
                tabla += '<td>' + ia.id + "</td>";
                tabla += '<td>' + ia.nombre + "</td>";
                tabla += '<td><button onclick="presentarDatos(' + ia.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
                tabla += '</tr>';
            });
            $('#TablaInfAdic').find('tbody').html(tabla);
            $('#TablaInfAdic').dataTable();
        } else {
            alert('el servicio no ha devolvido ningun dato,refresque la página o intentelo más tarde');
        }
    });
}

function registrar() {
    if ($('#nombreInfAdic').val().trim() !== '') {
        let id = parseInt($('#idIA').val());
        let url = 'http://localhost:9090/api/informacionAdicional' + (id !== 0 ? ('/' + id) : '');
        let datos = {
            nombre: $('#nombreInfAdic').val()
        };
        $.ajax({
            type: (id === 0 ? 'post' : 'put'), url: url, data: JSON.stringify(datos), headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: (xhr) => {
                let data = xhr.responseJSON
                switch (xhr.status) {
                    case 200: {
                        alertify.success(data.message + ' 😀');
                        setTimeout(function () {
                            location.reload();
                        });
                        break;
                    }
                    case 400: {
                        alertify.warning(data.message + ' ☹');
                    }
                    case 500: {
                        alertify.error(data.message)
                    }
                }
            }
        });
    } else {
        alertify.warning('por favor llene todos los campos');
    }
}

function presentarDatos(id) {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/informacionAdicional/' + id, data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, complete: xhr => {
            let data = xhr.responseJSON
            switch (xhr.status) {
                case 302: {
                    $('#idIA').val(data.body.id);
                    $('#nombreInfAdic').val(data.body.nombre);
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
    $('#modal-default').modal();
    $('button#btnSave').html('<i class="fas fa-save"></i> Actualizar Información Adicional');
}