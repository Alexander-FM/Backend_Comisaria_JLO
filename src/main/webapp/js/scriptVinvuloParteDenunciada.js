$(document).ready(() => {
    let li_grupo_registros = $('#li_grupo_registros');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_vpd').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    cargarTabla();
});

function cargarTabla() {
    $.get('http://localhost:9090/api/vinculoParteDenunciada', {}, r => {
        if (r.rpta === 1) {
            let tabla = '';
            r.body.forEach(vpd => {
                tabla += '<tr>';
                tabla += '<td>' + vpd.id + "</td>";
                tabla += '<td>' + vpd.nombre + "</td>";
                tabla += '<td><button onclick="presentarDatos(' + vpd.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
                tabla += '</tr>';
            });
            $('#TablaVinculoPD').find('tbody').html(tabla);
            $('#TablaVinculoPD').dataTable();
        } else {
            alert('el servicio no ha devolvido ningun dato,refresque la página o intentelo más tarde');
        }
    });
}

function registrar() {
    if ($('#vinculoPartDenunciada').val().trim() !== '') {
        let id = parseInt($('#idVPD').val());
        let url = 'http://localhost:9090/api/vinculoParteDenunciada' + (id !== 0 ? ('/' + id) : '');
        let data = {
            nombre: $('#vinculoPartDenunciada').val()
        };
        $.ajax({
            type: (id === 0 ? 'post' : 'put'), url: url, data: JSON.stringify(data), headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, complete: xhr => {
                let data = xhr.responseJSON
                switch (xhr.status) {
                    case 200: {
                        alertify.success(data.message + '😀');
                        setTimeout(function () {
                            location.reload();
                        });
                        break;
                    }
                    case 400: {
                        alertify.warning(data.message)
                        break;
                    }
                    case 500: {
                        alertify.error(data.message)
                    }
                }
            }
        });
    } else {
        alert('por favor complete todos los campos');
    }
}

function presentarDatos(id) {
    $.ajax({
        type: 'get', url: 'http://localhost:9090/api/vinculoParteDenunciada/' + id, data: {}, headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, complete: xhr => {
            let data = xhr.responseJSON
            switch (xhr.status) {
                case 302: {
                    $('#idVPD').val(data.body.id);
                    $('#vinculoPartDenunciada').val(data.body.nombre);
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
    $('#btnSave').html('<i class="fas fa-save"></i> Actualizar Vínculo Parte Denunciada');
}

function reset() {
    $('#idVPD').val(0);
    $('#vinculoPartDenunciada').val('');
    $('#btnSave').html('<i class="fas fa-save"></i> Registrar Vínculo');

}