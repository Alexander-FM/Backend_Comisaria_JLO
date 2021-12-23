$(document).ready(function () {
    let li_grupo_registros = $('#li_grupo_reportes');
    li_grupo_registros.attr('class', 'nav-item has-treeview menu-close menu-open');
    let a = $('#li_rdenuncias').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    $("input:checkbox").prop('checked', false);
    $('.select2').select2();
    cargarTabla();
    cargarCriterios();
});
function cargarCriterios() {
    let opcion = parseInt($('#cboTipoFiltro').val());
    var combo = '';
    switch (opcion) {
        case 1:
            $.get('http://localhost:9090/api/tipoDenuncia/todos', {}, function (r) {
                r.body.forEach(t => {
                    combo += '<option value="' + t.id + '">' +t.tipoDenuncia + '</option>';
                    $('#cboFiltro').html(combo);
                });
            });
            break;
        case 2:
           $.get('http://localhost:9090/api/vinculoParteDenunciada', {}, function (r) {
                r.body.forEach(v => {
                    combo += '<option value="' + v.id + '">' +v.nombre + '</option>';
                    $('#cboFiltro').html(combo);

                });
            });
            break;
        case 3:
            $.get('http://localhost:9090/api/policia/todos', {}, function (r) {
                r.body.forEach(p => {
                    combo += '<option value="' + p.id + '">' + p.nombres + ' ' + p.apellidoPaterno + ' ' + p.apellidoMaterno + '</option>';
                    $('#cboFiltro').html(combo);

                });
            });
            break;
        case 4:
            combo += '<option value="0">Pendiente</option>';
            combo += '<option value="1">Diligenciada</option>';
            break;
    }
    $('#cboFiltro').html(combo);
    //alert(opcion);
}
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
            tabla += '<td>' + d.cod_denuncia + '</td>';
            tabla += '<td>' + d.distrito.distrito + '</td>';
            tabla += '<td>' + d.vinculoParteDenunciada.nombre + '</td>';
            tabla += '<td>' + d.fechaDenuncia + '</td>';
            tabla += '<td>' + d.policia.nombres + ' ' + d.policia.apellidoPaterno + ' ' + d.policia.apellidoMaterno + '</td>';
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
function concatenarCero(numeros) {
    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i] < 10)
            numeros[i] = "0" + numeros[i];
    }
    return numeros;
}
function reporte(accion) {
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
            $('#accion').val(accion);
            $('#lista').val(JSON.stringify(r.body));
            $('#frmReporte').submit();
        } else {
            alert(r.message);
        }
    });
}