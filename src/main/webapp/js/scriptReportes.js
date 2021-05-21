$(document).ready(function () {
    let a = $('#li_inicio').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    cargarReporte();
    initSocket();

});
function cargarReporte() {
    try {
        $(function () {
            $('.select2').select2();

            var reporteDenuncias = $('#grafico1').get(0).getContext('2d');
            $.get('http://localhost:9090/api/denuncia/reporte2', {}, function (r) {
                debugger;
                var tipoData = {
                    labels: r.body.vinculo.vinculos,
                    datasets: [
                        {
                            data: r.body.vinculo.contadores,
                            backgroundColor: ['#f56954', '#00a65a', '#3c8dbc', '#07575B']
                        }
                    ]
                };
                var donutOptions = {
                    maintainAspectRatio: false,
                    responsive: true
                };
                var donutChart = new Chart(reporteDenuncias, {
                    type: 'pie',
                    data: tipoData,
                    options: donutOptions
                });
                $(function () {
                    var reporteDenuncias = $('#grafico2').get(0).getContext('2d');
                    var tipoData = {
                        labels: r.body.tipo.tipos,
                        datasets: [
                            {
                                data: r.body.tipo.contadores,
                                backgroundColor: ['#f56954', '#00a65a', '#3c8dbc', '#004445']
                            }
                        ]
                    };
                    var donutOptions = {
                        maintainAspectRatio: false,
                        responsive: true
                    };
                    //Create pie or douhnut chart
                    // You can switch between pie and douhnut using the method below.
                    var donutChart = new Chart(reporteDenuncias, {
                        type: 'doughnut',
                        data: tipoData,
                        options: donutOptions
                    });
                });
            });
        });
    } catch (e) {
        alert('no se pudo cargar el reporte:' + e);
    }
}
;
function initSocket() {
    try {
        var socket = new SockJS('http://localhost:9090/socket-comisariajlo');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            alertify.success('conexión con el socket establecida correctamnte');
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/denuncia-noti', function (response) {
                var de = JSON.parse(response.body);
                console.log(de);
                var message = alertify.message('se ha ingresado una nueva denuncia,distrito:' + de.denuncia.distrito.distrito);
                document.getElementById('audio_noti').play();
                message.delay(5);
            });
        });
    } catch (error) {
        alertify.error('no se ha podido establecer conexión con el socket:' + error);
    }
}
