$(document).ready(function () {
    $('.select2').select2();
    cargarTabla();
});
function cargarCriterios() {
    let opcion = parseInt($('#cboTipoFiltro').val());
    var combo = '';
    switch (opcion) {
        case 1:
            combo += '<option value="1">Física</option>';
            combo += '<option value="2">Psicológica</option>';
            combo += '<option value="3">Sexual</option>';
            break;
        case 2:
            combo += '<option value="1">Laboral</option>';
            combo += '<option value="2">Familiar</option>';
            combo += '<option value="3">Otro</option>';
            break;
        case 3:
            $.get('http://localhost:9090/api/policia/todos', {}, function (r) {
                r.body.forEach(p => {
                    combo += '<option value="' + p.id + '">' + p.nombres + ' ' + p.apellidos + '</option>';
                    $('#cboFiltro').html(combo);

                });
            });
            break;
        case 4:
            combo += '<option value="1">Pendiente</option>';
            combo += '<option value="2">Diligenciada</option>';
            break;
    }
    $('#cboFiltro').html(combo);
    //alert(opcion);
}
;
function cargarTabla() {
    let select = $('#cboFiltro').val();
    let fechaInicial = $('#fechaRangoInicial').val();
    let fechaFinal = $('#fechaRangoFinal').val();
    let peticion = {
        filtro: parseInt($('#cboTipoFiltro').val()),
        seleccion: select,
        fechaInicial: fechaInicial,
        fechaFinal: fechaFinal
    };
    debugger;
    //console.log(peticion);
    $.get('http://localhost:9090/api/denuncia/reportefiltro', peticion, function (r) {
        console.log(r.body);
        var tabla = '';
        r.body.forEach(d => {
            tabla += '<tr>';
            tabla += '<td>' + d.id + '</td>';
            tabla += '<td>' + d.tipoDenuncia.tipoDenuncia + '</td>';
            tabla += '<td>' + formaterFecha(d.fechaDenuncia) + '</td>';
            tabla += '<td>' + d.policia.nombres + '</td>';
            tabla += "<td>? ? ?</td>";
            tabla += "<td>? ? ?</td>";
            tabla += "<td>? ? ?</td>";
            tabla += '<td style=\"text-align: center\">' + (d.estadoDenuncia === true ? '<h5><span class =\"badge badge-success\">Diligenciada</span></h5>' : '<h5><span class =\"badge badge-danger\">Pendiente</span></h5>') + '</td>';
            tabla += '</tr>';
        });
        $('#TablaReportes').find('tbody').html(tabla);
        $('#TablaReportes').dataTable();
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
    let select = $('#cboFiltro').val();
    let fechaInicial = $('#fechaRangoInicial').val();
    let fechaFinal = $('#fechaRangoFinal').val();
    let peticion = {
        filtro: parseInt($('#cboTipoFiltro').val()),
        seleccion: select,
        fechaInicial: fechaInicial,
        fechaFinal: fechaFinal
    };
    $.get('http://localhost:9090/api/denuncia/reportefiltro', peticion, function (r) {
        if (r.rpta === 1) {
            $('#lista').val(JSON.stringify(r.body));
            $('#frmReporte').submit();
        } else {
            alert('el reporte no se ha generado debido a un error del servicio:' + r.body);
        }
    });
}