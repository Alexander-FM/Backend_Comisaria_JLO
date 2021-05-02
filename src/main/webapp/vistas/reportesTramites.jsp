<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page session="true" %>
<%
    if (request.getSession().getAttribute("usuario") != null) {
%>
<html lang="en">
    <head>
        <%@include file="plus/head.html" %>
    </head>
    <body class="hold-transition sidebar-mini">
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
                                <h1 class="m-0 text-dark">Reportes Trámites</h1>
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="../vistas/reportesDenuncias.jsp">Reportes</a></li>
                                    <li class="breadcrumb-item active">Reporte Trámites</li>
                                </ol>
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>
                <div class="content">
                    <div class="container-fluid">
                        <div class="card card-default">
                            <div class="card-header">
                                <h3 class="card-title">Filtros para generar reportes de trámites</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                    <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button>
                                </div>
                            </div>
                            <div class="card-body">                               
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                        <label> Tipo Filtro</label>
                                        <div class="form-inline">                                             
                                            <select id="combo_criterio_t" class="select2 col-lg-12" onchange="cargarCriteriosT()" data-placeholder="Seleccionar">
                                                <option value="1">Tipo Trámite</option>
                                                <option value="2">Buscar Por Policia</option>
                                                <option value="3">Buscar Por Estado Trámite</option>
                                            </select> 
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3">                                     
                                        <label>Res. del Filtro</label>
                                        <div class="form-inline">                                             
                                            <select id="combo_criterios_t" class="select2 col-lg-12" data-placeholder="Seleccionar">
                                                <option value="1">Copia Certificada</option>
                                                <option value="2">Solicitud</option>
                                                <option value="3">Otro</option>
                                            </select> 
                                        </div>                                      
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                        <label>Rango Fecha:</label>
                                        <div class="form-inline">                                            
                                            <input required="" type="date" id="fecha1" name="fecha1" class="form-control col-xl-4 col-lg-4 col-md-4 col-sm-4"> 
                                            <input required="" type="date" id="fecha2" name="fecha2" class="form-control col-xl-4 col-lg-4 col-md-4 col-sm-4" style="margin-left: 5px;"> <!-- El margin left agrega 10px a cualquier elemento del bloque que tenga a su izquierda.-->
                                            <button onclick="cargarTabla()" type="submit" id="reporte1" class="btn btn-outline-success" style="margin-left: 5px;"><i class="fa fa-chart-line"></i> Generar Reporte</button>
                                        </div>  
                                    </div>
                                </div>                                 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Listado De Reportes De Trámites</h3>
                                    </div>
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                        <div class="form-group">
                                            <form target="_blank" action="../tramite" id="frmReporte" method="post">
                                                <input type="hidden" name="accion" id="accion">
                                                <button type="button" class="btn btn-sm btn-outline-primary" onclick="reporte('ExportarPDF')"><i class="fas fa-file-pdf"></i> Exportar PDF</button>
                                                <button onclick="reporte('ReporteJasperPDF')" type="button"class="btn btn-sm btn-outline-info"><i class="fas fa-file-pdf"></i> Exportar con JasperReports</button>
                                                <input type="hidden" name="lista" id="lista">
                                            </form>
                                        </div>
                                        <table id="TablaReportesTramites" class="table table-bordered table-hover table-responsive-xl table-responsive-lg table-responsive-md table-responsive-sm">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Id</th>
                                                    <th class="text-center">FechaDenuncia</th>
                                                    <th class="text-center">Policia</th>
                                                    <th class="text-center">Tipo Trámite</th>
                                                    <th class="text-center">Estado</th>
                                                    <th class="text-center">Denunciante</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th class="text-center">Id</th>
                                                    <th class="text-center">FechaDenuncia</th>
                                                    <th class="text-center">Policia</th>
                                                    <th class="text-center">Tipo Trámite</th>
                                                    <th class="text-center">Estado</th>
                                                    <th class="text-center">Denunciante</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                                <!-- /.card -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container-fluid -->
                </div>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->

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
        <!-- DataTable-->
        <script src="../plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
        <script src="../plugins/datatables/jquery.dataTables.js" type="text/javascript"></script>
        <script src="../plugins/datatables-bs4/js/dataTables.bootstrap4.js" type="text/javascript"></script>
        <!-- Select 2 -->
        <!-- Admin -->
        <script src="../dist/js/adminlte.min.js"></script>
        <script src="../js/scriptReporteTramite.js"></script>
    </body>
</html>
<%
    } else {
        response.sendRedirect("../index.jsp");
    }
%>


