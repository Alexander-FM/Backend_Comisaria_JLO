$(document).ready(function () {
    cargarTabla();
});
function cargarTabla() {
    $.get('http://localhost:9090/api/vinculoParteDenunciada', {}, function (r) {
        if (r.rpta === 1) {
            var tabla = '';
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
                        alertify.success('vínculo ' + (id === 0 ? 'registrado' : 'actualizado') + '😀');
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                        break;
                    case 0:
                        alert(data.body + ' ☹');
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
        alert('por favor complete todos los campos');
    }
}
function presentarDatos(id) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:9090/api/vinculoParteDenunciada/' + id,
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            switch (data.rpta) {
                case 1:
                    $('#idVPD').val(data.body.id);
                    $('#vinculoPartDenunciada').val(data.body.nombre);
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
    $('#modal-default').modal();
    $('#btnSave').html('<i class="fas fa-save"></i> Actualizar Vínculo Parte Denunciada');
}
function reset() {
    $('#idVPD').val(0);
    $('#vinculoPartDenunciada').val('');
    $('#btnSave').html('<i class="fas fa-save"></i> Registrar Vínculo');

}