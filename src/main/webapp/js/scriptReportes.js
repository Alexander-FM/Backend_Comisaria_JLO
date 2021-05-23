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
            toastr.success('Conexión con el socket establecida correctamente');
            document.getElementById('audio_noti1').play();            
            //$('.toast').toast({delay:1000, animation:false});
            //alertify.success('Conexión con el socket establecida correctamnte');
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/denuncia-noti', function (response) {
                var de = JSON.parse(response.body);
                console.log(de);
                var message = $('.toast-body').html('Se ha ingresado una nueva denuncia, en el distrito : ' + de.denuncia.distrito.distrito);
                $('.toast').toast('show');
                //var message = toastr.info('Se ha ingresado una nueva denuncia, en el distrito : ' + de.denuncia.distrito.distrito);                   
                //var message = alertify.warning('Se ha ingresado una nueva denuncia, en el distrito : ' + de.denuncia.distrito.distrito);
                document.getElementById('audio_noti2').play();
                message.delay(7);
            });
        });
    } catch (error) {
        toastr.error('No se ha podido establecer conexión con el socket:' + error);
    }
}
