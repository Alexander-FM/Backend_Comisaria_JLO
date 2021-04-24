$(document).ready(function () {
     let li_grupo_registros = $('#li_grupo_registros');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_infoadic').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    cargarTabla();
});
function cargarTabla() {
    $.get('http://localhost:9090/api/informacionAdicional', {}, function (r) {
        if (r.rpta === 1) {
            var tabla = '';
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
        let data = {
            nombre: $('#nombreInfAdic').val()};
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
                        alertify.success('Información Adicional ' + (id === 0 ? 'registrada': 'actualizada') + ' 😀');
                        setTimeout(function () {
                            location.reload();
                        }, 1500)
                        break;
                    case 0:
                        alertify.warning(data.body + ' ☹');
                        break;
                    default :
                        alertify.danger('ha ocurrido un error durante el registro ⚙,inténtelo nuevamente en unos mintos ⏲');
                        break;
                }
            }, error: function (x, y) {
                alertify.danger('el servicio no esta disponible,vuelva a intentarlo más tarde');
                //console.log(x.responseText);
            }
        });
    } else {
        alertify.warning('por favor llene todos los campos');
    }
};

function presentarDatos(id){
    $.ajax({
       type: 'get',
       url: 'http://localhost:9090/api/informacionAdicional/' + id,
       data: {},
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       success: function (data){
           switch(data.rpta){
                case 1:
                   $('#idIA').val(data.body.id);
                   $('#nombreInfAdic').val(data.body.nombre);
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
    $('button#btnSave').html('<i class="fas fa-save"></i> Actualizar Información Adicional');
}