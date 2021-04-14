$(document).ready(function () {
    $('.select2').select2();
    cargarTabla();
    cargarDatosRegistro();
});
function cargarTabla() {
    $.get('http://localhost:9090/api/policia/todos', {}, function (r) {
        if (r.rpta === 1) {
            var tabla = '';
            r.body.forEach(p => {
                tabla += '<tr>';
                tabla += '<td>' + p.id + "</td>";
                tabla += '<td>' + (p.nombres + ' ' + p.apellidoPaterno +' '+p.apellidoMaterno) + "</td>";
                tabla += '<td>' + p.distrito.distrito + "</td>";
                tabla += '<td>' + p.gradoPNP.nombreGrado + "</td>";
                tabla += '<td style=\"text-align: center\">' + (p.estado ? '<h5><span class =\"badge badge-success\">Activo</span></h5>' : '<h5><span class =\"badge badge-danger\">Inactivo</span></h5>') + '</td>';
                tabla += '<td style=\"text-align: center\"><button onclick="presentarDatos(' + p.id + ')" class="btn btn-warning"><i class="fas fa-edit"></i></button></td>';
                tabla += '</tr>';
            });
            $('#TablaPolicias').find('tbody').html(tabla);
            $('#TablaPolicias').dataTable();
        } else {
            alert('el servicio no ha devolvido ningun dato,refresque la página o intentelo más tarde');
        }
    });
}
function cargarDatosRegistro() {
    cargarDistritos();
    cargarGrados();
}
function cargarDistritos() {
    $.ajax({

        type: 'get',
        url: 'http://localhost:9090/api/distrito/todos',
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            switch (data.rpta) {
                case 1:
                    let comboDistritos = '';
                    data.body.forEach(d => {
                        comboDistritos += '<option value="' + d.id + '">' + d.distrito + '</option>';
                    });
                    $('#combo_distrito').html(comboDistritos);
                    $('#btnRegistrarPolicia').removeAttr('disabled');
                    break;
                case 0:
                    alertify.warning(data.body + ' ☹');
                    break;
                default :
                    alert('ha ocurrido un error durante el registro ⚙,inténtelo nuevamente en unos mintos ⏲');
                    break;
            }
        }, error: function (x, y) {
            alertify.set('notifier', 'position', 'top-center');
            alertify.set('notifier', 'delay', 10);
            alertify.error('se ha intentado obtener los distritos para el formulario de registro pero ocurrió un error,por favor refresque la pagina<br>\n\
            si el problema persiste cierre la app y espere unos minutos');
            //console.log(x.responseText);
        }
    });
}
function cargarGrados() {
    $.ajax({

        type: 'get',
        url: 'http://localhost:9090/api/grado',
        data: {},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
            switch (data.rpta) {
                case 1:
                    let comboGrado = '';
                    data.body.forEach(g => {
                        comboGrado += '<option value="' + g.id + '">' + g.nombreGrado + '</option>';
                    });
                    $('#combo_grado').html(comboGrado);
                    $('#btnRegistrarPolicia').removeAttr('disabled');
                    break;
                case 0:
                    alertify.warning(data.body + ' ☹');
                    break;
                default :
                    alert('ha ocurrido un error durante el registro ⚙,inténtelo nuevamente en unos mintos ⏲');
                    break;
            }
        }, error: function (x, y) {
            alertify.set('notifier', 'position', 'top-center');
            alertify.set('notifier', 'delay', 10);
            alertify.error('se ha intentado obtener los grados para el formulario de registro pero ocurrió un error,por favor refresque la pagina<br>\n\
            si el problema persiste cierre la app y espere unos minutos');
            //console.log(x.responseText);
        }
    });
}

function registrar() {
    if ($('#nombres').val().trim() !== '') {
        let id = parseInt($('#idP').val());
        let url = 'http://localhost:9090/api/policia' + (id !== 0 ? ('/' + id) : '');
        let data = {
            nombres: $('#nombres').val(),
            apellidoPaterno: $('#apellidoPaterno').val(),
            apellidoMaterno:$('#apellidoMaterno').val(),
            sexo: $('#combo_genero_policia').val(),
            telefono: $('#telefonoPolicia').val(),
            estado: ($('#estadoPol').is(':checked')),
            distrito:{id: parseInt($('#combo_distrito').val())},
            gradoPNP:{id: parseInt($('#combo_grado').val())},
            tipoIdentificacion:{id: 1},
            numeroIdentificacion: $('#numIdentificacion').val()
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
                        alertify.success('Policía ' + (id === 0 ? 'registrado': 'actualizado') + ' 😀');
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
};

function presentarDatos(id) {
        $.ajax({
        type: 'get',
                url: 'http://localhost:9090/api/policia/' + id,
                data: {},
                headers: {
                'Accept': 'application/json',
                        'Content-Type': 'application/json'
                },
                success: function (data) {
                switch (data.rpta) {
                case 1:
                        $('#idP').val(data.body.id);
                        $('#nombres').val(data.body.nombres);
                        $('#apellidos').val(data.body.apellidos);
                        //let item3 = '<option value="' + data.body.sexo + '" selected>'+'</option>'
                        //$('#combo_genero_policia').append(item3);
                        $('#combo_genero_policia').val(data.body.sexo);
                        $('#telefonoPolicia').val(data.body.telefono);
                        $("#estadoPol").prop('checked', data.body.estado);
                        let item2 = '<option value="'+data.body.distrito.id +'" selected>' + (data.body.distrito.distrito) + '</option>';
                        $('#combo_distrito').append(item2);
                        let item1 = '<option value="'+data.body.gradoPNP.id +'" selected>' + (data.body.gradoPNP.nombreGrado) + '</option>';
                        $('#combo_grado').append(item1);
                        $('#numIdentificacion').val(data.body.numeroIdentificacion);
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
                $('#btn-save').html('<i class="fas fa-sync-alt"></i> Actualizar Policia');
};