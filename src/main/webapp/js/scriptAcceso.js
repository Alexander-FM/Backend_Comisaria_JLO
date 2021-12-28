$(document).ready(function () {
    var grado = $("#grado_pnp").val();
    if (grado !== 'Coronel' && grado !== 'Mayor') {
        $('#li_policias').remove();
        $('#li_gradopnp').remove();
        $('#li_loginpnp').remove();
    }
});