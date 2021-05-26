<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page session="true" %>
<%
    if (session.getAttribute("usuario") != null) {
%>
<html lang="en">
    <head>
        <%@include file="plus/head.html" %>
    </head>
    <body class="hold-transition sidebar-mini">
        <audio id="audio_noti" style="display: none">
            <source src="../songs/noti_nuevadenuncia.mp3" type="audio/mp3">
        </audio>
        <audio id="audio_noti1" style="display: none">
            <source src="../songs/intro.mp3" type="audio/mp3">
        </audio>
        <audio id="audio_noti2" style="display: none">
            <source src="../songs/notificacionnueva.mp3" type="audio/mp3">
        </audio>
        <div class="wrapper">
            <%@include file="plus/menuSuperior.jsp" %>
            <%@include  file="plus/menuLateral.jsp"%>
            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Pagina Principal</h1>
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                                    <li class="breadcrumb-item active">Pagina Principal</li>
                                </ol>
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Main content -->
                <div class="content">
                    <div class="container-fluid">                        
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="info-box">
                                    <span class="info-box-icon bg-info elevation-1"><i class="fas fa-file-alt"></i></span>

                                    <div class="info-box-content">
                                        <span class="info-box-text">Total Denuncias Ingresadas</span>
                                        <span class="info-box-number">
                                            400
                                        </span>
                                    </div>
                                    <!-- /.info-box-content -->
                                </div>
                                <!-- /.info-box -->
                            </div>
                            <!-- /.col -->
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="info-box mb-3">
                                    <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-file-alt"></i></span>

                                    <div class="info-box-content">
                                        <span class="info-box-text">Total de Trámites Ingresados</span>
                                        <span class="info-box-number">450</span>
                                    </div>
                                    <!-- /.info-box-content -->
                                </div>
                                <!-- /.info-box -->
                            </div>
                            <!-- /.col -->

                            <!-- fix for small devices only -->
                            <div class="clearfix hidden-md-up"></div>

                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="info-box mb-3">
                                    <span class="info-box-icon bg-success elevation-1"><i class="fas fa-file-signature"></i></span>

                                    <div class="info-box-content">
                                        <span class="info-box-text">Denuncias Por Atender</span>
                                        <span class="info-box-number">100</span>
                                    </div>
                                    <!-- /.info-box-content -->
                                </div>
                                <!-- /.info-box -->
                            </div>
                            <!-- /.col -->
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="info-box mb-3">
                                    <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-file-signature"></i></span>

                                    <div class="info-box-content">
                                        <span class="info-box-text">Trámites por Atender</span>
                                        <span class="info-box-number">50</span>
                                    </div>
                                    <!-- /.info-box-content -->
                                </div>
                                <!-- /.info-box -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <div class="card">
                                        <div class="card-header" style="background-color: #114a39; color: white">
                                            <h3 class="card-title">Reporte Gráfico Del vínculo Con La Parte Denunciada Más Realizadas</h3>
                                            <div class="card-tools">
                                                <button type="button" disabled="" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times" style="color: #114a39"></i></button>
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus" style="color: white"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <canvas id="grafico1" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                                        </div>
                                        <!-- /.card-body -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="card">
                                        <div class="card-header" style="background-color: #114a39; color: white">
                                            <h3 class="card-title">Reporte Gráficos De Trámite Realizados En Las Últimas Semanas</h3>
                                            <div class="card-tools">
                                                <button type="button" disabled="" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times" style="color: #114a39"></i></button>
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus" style="color: white"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="position-relative mb-4">
                                                <canvas id="grafico3" height="200"></canvas>
                                            </div>

                                            <div class="d-flex flex-row justify-content-end">
                                                <span class="mr-2">
                                                    <i class="fas fa-square" style="color: #114a39;"></i> Esta Semana
                                                </span>

                                                <span>
                                                    <i class="fas fa-square text-gray"></i> Semana Pasada
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <div class="card">
                                        <div class="card-header" style="background-color: #114a39; color: white">
                                            <h3 class="card-title">Reporte Gráfico Del Tipo De Denuncias Más Realizadas</h3>
                                            <div class="card-tools">
                                                <button type="button" disabled="" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times" style="color: #114a39"></i></button>
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus" style="color: white"></i></button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <canvas id="grafico2" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                                        </div>
                                        <!-- /.card-body -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="card">
                                        <div class="card-header" style="background-color: #114a39; color: white">
                                            <h3 class="card-title">Reporte Gráfico De Denuncias Realizadas En Los Últimos Años</h3>
                                            <div class="card-tools">
                                                <button type="button" disabled="" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times" style="color: #114a39"></i></button>
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus" style="color: white"></i></button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="position-relative mb-4">
                                                <canvas id="grafico4" height="200"></canvas>
                                            </div>
                                            <div class="d-flex flex-row justify-content-end">
                                                <span class="mr-2">
                                                    <i class="fas fa-square" style="color: #114a39;"></i> Este Año
                                                </span>
                                                <span>
                                                    <i class="fas fa-square text-gray"></i> Año Anterior
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.container-fluid -->
                </div>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->

            <!-- Control Sidebar -->
            <aside class="control-sidebar control-sidebar-dark">
                <!-- Control sidebar content goes here -->
                <div class="p-3">
                    <h5>Title</h5>
                    <p>Sidebar content</p>
                </div>
            </aside>
            <!-- /.control-sidebar -->

            <!-- Main Footer -->
            <footer class="main-footer">
                <!-- To the right -->
                <div class="float-right d-none d-sm-inline">
                    Desarrollado por DevSoft
                </div>
                <!-- Default to the left -->
                <strong>Copyright &copy; 2021-2025 <a href="https://adminlte.io">DevSoft</a>.</strong> Todos los derechos reservados.
            </footer>
        </div>
        <!-- ./wrapper -->

        <!-- REQUIRED SCRIPTS -->

        <!-- jQuery -->
        <script src="../plugins/jquery/jquery.min.js"></script>
        <!-- Bootstrap 4 -->
        <script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
        <!-- Toastr -->
        <script src="../plugins/toastr/toastr.min.js" type="text/javascript"></script>
        <!-- SweetAlert2 -->
        <script src="../plugins/sweetalert2/sweetalert2.min.js" type="text/javascript"></script>
        <!-- Select 2 -->
        <script src="../plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
        <!-- Pie Chart -->
        <script src="../plugins/chart.js/Chart.min.js" type="text/javascript"></script>
        <!-- AdminLTE App -->
        <script src="../dist/js/adminlte.min.js"></script>
        <script src="../js/socket/sockjs.min.js" type="text/javascript"></script>
        <script src="../js/socket/stomp.min.js" type="text/javascript"></script>

        <script src="../plugins/alertifyjs/alertify.min.js" type="text/javascript"></script>
        <link href="../plugins/alertifyjs/css/alertify.min.css" rel="stylesheet" type="text/css"/>
        <script src="../js/scriptReportes.js"></script>
    </body>
</html>
<%
    } else {
        response.sendRedirect("../index.jsp");
    }
%>

