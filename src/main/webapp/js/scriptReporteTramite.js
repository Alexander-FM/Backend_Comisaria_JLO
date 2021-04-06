$(document).ready(function () {
    $('.select2').select2();
    cargarTabla();
});

function cargarCriteriosT() {
    var opcion = parseInt($('#combo_criterio_t').val());
    var combo = '';
    switch (opcion) {
        case 1:
            combo += '<option value="1">Copia Certificada</option>';
            combo += '<option value="2">Solicitud</option>';
            combo += '<option value="3">Otro</option>';
            break;
        case 2:
            $.get('http://localhost:9090/api/policia', {}, function (r) {
                r.body.forEach(p => {
                    combo += '<option value="' + p.id + '">' + p.nombres + ' ' + p.apellidos + '</option>';
                    $('#combo_criterios_t').html(combo);
                });
            });
            break;
        case 3:
            combo += '<option value="1">Pendiente</option>';
            combo += '<option value="2">Diligenciada</option>';
            break;
    }
    $('#combo_criterios_t').html(combo);
    //alert(opcion);
}
;

function cargarTabla() {
    let select = $('#combo_criterios_t').val();
    let fechaInicial = $('#fecha1').val();
    let fechaFinal = $('#fecha2').val();
    let peticion = {
        filtro: parseInt($('#combo_criterio_t').val()),
        seleccion: select,
        fechaInicial: fechaInicial,
        fechaFinal: fechaFinal
    };
    debugger;
    //console.log(peticion);
    $.get('http://localhost:9090/api/tramite/reportefiltro', peticion, function (r) {
        console.log(r.body);
        var tabla = '';
        r.body.forEach(t => {
            tabla += '<tr>';
            tabla += '<td style=\"text-align: center\">' + t.id + '</td>';
            tabla += '<td style=\"text-align: center\" nowrap>' + formaterFecha(t.fechaDenuncia) + '</td>';
            tabla += '<td style=\"text-align: center\" nowrap>' + t.policia.nombres + ' ' + t.policia.apellidos + '</td>';
            tabla += '<td style=\"text-align: center\">' + t.tipoTramite.tipoTramite + '</td>';
            tabla += '<td style=\"text-align: center\">' + (t.estadoTramite === true ? '<h5><span class =\"badge badge-success\">Diligenciada</span></h5>' : '<h5><span class =\"badge badge-danger\">Pendiente</span></h5>') + '</td>';
            tabla += '<td style=\"text-align: center\">' + t.usuario.nombres + ' ' + t.usuario.apellidoPaterno + ' ' + t.usuario.apellidoMaterno + '</td>';
            tabla += '</tr>';
        });
        $('#TablaReportesTramites').find('tbody').html(tabla);
        $('#TablaReportesTramites').dataTable();
    });
}
function formaterFecha(timestamp) {
    let datetime = new Date(timestamp);
    let dia = datetime.getDate();
    let mes = datetime.getMonth() + 1;
    let anio = datetime.getFullYear();

    let fecha = concatenarCero([dia, mes, anio]);
    let fecha_string = fecha[0] + '-' + fecha[1] + '-' + fecha[2];

    let horas = datetime.getHours();
    let minutos = datetime.getMinutes();
    let segundos = datetime.getSeconds();

    let hora = concatenarCero([horas, minutos, segundos]);
    let hora_string = hora[0] + ':' + hora[1] + ':' + hora[2];

    return fecha_string + ' ' + hora_string;
}
;

function concatenarCero(numeros) {
    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i] < 10)
            numeros[i] = "0" + numeros[i];
    }
    return numeros;
}
;

function reporte() {
    let select = $('#combo_criterios_t').val();
    let fechaInicial = $('#fecha1').val();
    let fechaFinal = $('#fecha2').val();
    let peticion = {
        filtro: parseInt($('#combo_criterio_t').val()),
        seleccion: select,
        fechaInicial: fechaInicial,
        fechaFinal: fechaFinal
    };
    $.get('http://localhost:9090/api/tramite/reportefiltro', peticion, function (r) {
        if (r.rpta === 1) {
            $('#lista').val(JSON.stringify(r.body));
            $('#frmReporte').submit();
        } else {
            alert('el reporte no se ha generado debido a un error del servicio:' + r.body);
        }
    });
}