$(document).ready(() => {
    let a = $('#li_inicio').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    obtenerContadorDenuncias();
    obtenerContadorTramites();
    obtenerContadorTramitesPendientes();
    obtenerContadorDenunciasPendientes();
    cargarReporte();
    cargarReportesGraficosTramites();
    initSocket();

});

function obtenerContadorDenuncias() {
    $.get('http://localhost:9090/api/denuncia/listarTotalDenunciasPorComisaria/' + $("#idComisaria").val(), {}, r => {
        $('#denunciasIngresadas').html(r.body);
    });
}
function obtenerContadorTramites() {
    $.get('http://localhost:9090/api/tramite/listarTotalTramitesPorComisaria/' + $("#idComisaria").val(), {}, r => {
        $('#tramitesIngresados').html(r.body);
    });
}

function obtenerContadorTramitesPendientes() {
    $.get('http://localhost:9090/api/tramite/listarCTramitesPendientePorComisaria/' + $("#idComisaria").val(), {}, r => {
        $('#tInactivo').html(r.body);
    });
}

function obtenerContadorDenunciasPendientes() {
    $.get('http://localhost:9090/api/denuncia/listarCDenunciasPendientePorComisaria/' + $("#idComisaria").val(), {}, r => {
        $('#dInactivo').html(r.body);
    });
}



function cargarReportesGraficosTramites() {
    $(() => {
        'use strict'

        let ticksStyle = {
            fontColor: '#495057',
            fontStyle: 'bold'
        };

        let mode = 'index';
        let intersect = true;

        let $salesChart = $('#grafico4');
        $.get('http://localhost:9090/api/denuncia/reporteAnual/' + $("#idComisaria").val(), {}, r => {
            new Chart($salesChart, {
                type: 'bar',
                data: {
                    labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
                    datasets: [
                        {
                            backgroundColor: '#114a39',
                            borderColor: '#114a39',
                            data: r.body.esteAño
                        },
                        {
                            backgroundColor: '#ced4da',
                            borderColor: '#ced4da',
                            data: r.body.añoPasado
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        mode: mode,
                        intersect: intersect
                    },
                    hover: {
                        mode: mode,
                        intersect: intersect
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            // display: false,
                            gridLines: {
                                display: true,
                                lineWidth: '4px',
                                color: 'rgba(0, 0, 0, .2)',
                                zeroLineColor: 'transparent'
                            },
                            ticks: $.extend({
                                suggestedMax: 10,
                                beginAtZero: true,

                                // Include a dollar sign in the ticks
                                callback: (value, index, values) => {
                                    if (value >= 1000) {
                                        value /= 1000
                                        value += 'k'//Si los trámites superan los 1000 se pone el valor de 'K' después de 1000 Ejemp: 1000k
                                    }
                                    return value
                                }
                            }, ticksStyle)
                        }],
                        xAxes: [{
                            display: true,
                            gridLines: {
                                display: false
                            },
                            ticks: ticksStyle
                        }]
                    }
                }
            });
        });

//GRÁFICO 3 - REPORTES DE TRÁMITES REALIZADOS EN LA ÚLTIMA SEMANA
        let $visitorsChart = $('#grafico3');
        $.get('http://localhost:9090/api/tramite/reportesemanal/' + $("#idComisaria").val(), {}, r => {
            new Chart($visitorsChart, {
                data: {
                    labels: ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
                    datasets: [{
                        type: 'line',
                        data: r.body.estaSemana,
                        backgroundColor: 'transparent',
                        borderColor: '#114a39',
                        pointBorderColor: '#114a39',
                        pointBackgroundColor: '#114a39',
                        fill: false
                        // pointHoverBackgroundColor: '#007bff',
                        // pointHoverBorderColor    : '#007bff'
                    },
                        {
                            type: 'line',
                            data: r.body.semanaPasada,
                            backgroundColor: 'tansparent',
                            borderColor: '#ced4da',
                            pointBorderColor: '#ced4da',
                            pointBackgroundColor: '#ced4da',
                            fill: false
                            // pointHoverBackgroundColor: '#ced4da',
                            // pointHoverBorderColor    : '#ced4da'
                        }]
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        mode: mode,
                        intersect: intersect
                    },
                    hover: {
                        mode: mode,
                        intersect: intersect
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            // display: false,
                            gridLines: {
                                display: true,
                                lineWidth: '4px',
                                color: 'rgba(0, 0, 0, .2)',
                                zeroLineColor: 'transparent'
                            },
                            ticks: $.extend({
                                beginAtZero: true,
                                suggestedMax: 10
                            }, ticksStyle)
                        }],
                        xAxes: [{
                            display: true,
                            gridLines: {
                                display: false
                            },
                            ticks: ticksStyle
                        }]
                    }
                }
            });
        });
    });
}
;
function cargarReporte() {
    try {
        $(() => {
            $('.select2').select2();
            let reporteDenuncias = $('#grafico1').get(0).getContext('2d');
            $.get('http://localhost:9090/api/denuncia/reporte2/' + $("#idComisaria").val(), {}, r => {
                let tipoData = {
                    labels: r.body.vinculo.vinculos,
                    datasets: [
                        {
                            data: r.body.vinculo.contadores,
                            backgroundColor: ['#f56954', '#00a65a', '#3c8dbc', '#07575B']
                        }
                    ]
                };
                let donutOptions = {
                    maintainAspectRatio: false,
                    responsive: true
                };
                let donutChart = new Chart(reporteDenuncias, {
                    type: 'pie',
                    data: tipoData,
                    options: donutOptions
                });
                $(() => {
                    let reporteDenuncias = $('#grafico2').get(0).getContext('2d');
                    let tipoData = {
                        labels: r.body.tipo.tipos,
                        datasets: [
                            {
                                data: r.body.tipo.contadores,
                                backgroundColor: ['#f56954', '#00a65a', '#3c8dbc', '#004445']
                            }
                        ]
                    };
                    let donutOptions = {
                        maintainAspectRatio: false,
                        responsive: true
                    };
                    //Create pie or douhnut chart
                    // You can switch between pie and douhnut using the method below.
                    new Chart(reporteDenuncias, {
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
function initSocket() {
    try {
        let socket = new SockJS('http://localhost:9090/socket-comisariajlo');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, frame => {
            toastr.success('Las notificaciones están activadas');
            document.getElementById('audio_noti1').play();
            //$('.toast').toast({delay:1000, animation:false});
            //alertify.success('Conexión con el socket establecida correctamnte');
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/denuncia-noti', response => {
                let de = JSON.parse(response.body);
                debugger;
                console.log(de);
                const message = $('.toast-body').html('Se ha ingresado una nueva denuncia');
                $('.toast').toast('show');
                //var message = toastr.info('Se ha ingresado una nueva denuncia, en el distrito : ' + de.denuncia.distrito.distrito);                   
                //var message = alertify.warning('Se ha ingresado una nueva denuncia, en el distrito : ' + de.denuncia.distrito.distrito);
                document.getElementById('audio_noti2').play();
                message.delay(10);
                cargarReporte();
                cargarReportesGraficosTramites();
                obtenerContadorDenuncias();
                obtenerContadorDenunciasPendientes();
            });
            stompClient.subscribe('/topic/tramite-noti', response => {
                let tra = JSON.parse(response.body);
                console.log(tra);
                let message = $('.toast-body').html('Se ha ingresado un nuevo trámite de tipo : ' + tra.tipoTramite.tipoTramite + ' con el usuario: ' + tra.usuario.nombres + " " + tra.usuario.apellidoPaterno + " " + tra.usuario.apellidoMaterno);
                $('.toast').toast('show');
                document.getElementById('notificacion_tramite').play();
                message.delay(10);
                cargarReportesGraficosTramites();
                obtenerContadorTramites();
                obtenerContadorTramitesPendientes();
            });
        });
    } catch (error) {
        toastr.error('No se ha podido establecer conexión con el socket:' + error);
    }
}
