$(document).ready(function () {
    let a = $('#li_inicio').find('a');
    a.attr('class', 'nav-link active');
    a.attr('style', 'background-color: black');
    cargarReporte();

});
function cargarReporte(){
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
        alert('no se pudo cargar el reporte:'+e); 
    }      
};
