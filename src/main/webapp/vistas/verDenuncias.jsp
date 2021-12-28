<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page session="true" %>
<%
    if (request.getSession().getAttribute("usuario") != null) {
%>
<html lang="es">
    <head>
        <%@include file="plus/head.html" %>
    </head>
    <body class="hold-transition sidebar-mini">
        <input type="hidden" id="idComisaria" value="${idComisarias}">
        <div class="wrapper">
            <%@include file="plus/menuSuperior.jsp" %>
            <%@include  file="plus/menuLateral.jsp"%>

            <form target="_blank" action="../denuncia" id="frmExportarDenuncia" method="post">
                <input type="hidden" name="accion" value="ExportarDenuncia" id="accion">
                <input type="hidden" name="denuncia" id="denuncia">
                <!-- Modal Actualizar Denuncia -->
            </form>

            <div class="modal fade" id="modal-ac">
                <input type="hidden" id="idD" value="0">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Actualizar Datos Denuncia</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="false"></span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <div class="form-group">
                                        <label>Asignar Policía</label>
                                        <select id="combo_policias" style="width: 100%" class="select2 form-control" data-placeholder="Seleccionar">                                               
                                            <!-- Cargar desde la base de datos -->
                                            <option>Cargando . . .</option>
                                        </select>  
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <div class="form-group">
                                        <label>Código Denuncia</label>
                                        <input maxlength="8" required="" id="codDenuncia" type="text" placeholder="Ingrese Cód. Denuncia" class="form-control">
                                        <!--<span>Si la denuncia es de <b>Tipo Sexual</b> se recomienda poner <u>D-"Cód-Denuncia"-S</u>, si es de <b> Tipo Psicológica</b> poner <u>D-"Cód-Denuncia"-P</u>, si es
                                            de <b>Tipo Económica</b> poner <u>D-"Cód-Denuncia"-E</u>, y si es de <b>Tipo Física</b> poner <u>D-"Cód-Denuncia"-F</u>.                                        
                                        </span>-->
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <label>Cambiar Estado Denuncia</label>
                                    <div class="form-group">                           
                                        <input id="estadoDenuncia" style="margin-top: 10px" type="checkbox" checked="" class="checkbox"> Diligenciada/Pendiente
                                    </div>
                                    <input type="hidden" id="fechaDenuncia">
                                    <input type="hidden" id="horaDenuncia">
                                    <input type="hidden" id="fechaHechos">
                                    <input type="hidden" id="horaHechos">
                                    <input type="hidden" id="direccion">
                                    <input type="hidden" id="referenciadireccion">
                                    <input type="hidden" id="distritoId">
                                    <input type="hidden" id="tipoDenunciaId">
                                    <input type="hidden" id="vPDId">
                                    <input type="hidden" id="userId">
                                    <input type="hidden" id="comisariaId">
                                    <input type="hidden" id="latitud">
                                    <input type="hidden" id="longitud">

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div class="alert alert-dismissible" style="background-color: #114a39; color: white">
                                        <button style="color: white" type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                        <h5><i class="icon fas fa-info"></i> Alerta!</h5>
                                        <p style="text-align: justify">Si la denuncia es de <b>Tipo Sexual</b> se recomienda poner <u>D-"Cód-Denuncia"-S</u>, si es de <b> Tipo Psicológica</b> poner <u>D-"Cód-Denuncia"-P</u>, si es
                                            de <b>Tipo Económica</b> poner <u>D-"Cód-Denuncia"-E</u> , y si es de <b>Tipo Física</b> poner <u>D-"Cód-Denuncia"-F</u> , ya que con esto se acelera el proceso de busqueda en la base de datos.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button id="btn-save" onclick="registrar()" type="button" class="btn btn-primary" data-dismiss="modal">Actualizar Denuncia</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- /. -->
            <style>
                #map {
                    height: 400px;
                    /* The height is 400 pixels */
                    width: 100%;
                    /* The width is the width of the web page */
                }
            </style>
            <div class="modal fade" id="modal-mapa">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Mapa Georefencial</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="false"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div id="map">

                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- Modal para el envio de correo electronicos -->
            <div class="modal fade" id="modal-correo">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Redactar Correo</h4>
                        </div>
                        <div class="modal-body">
                            <div class="card card-primary card-outline">
                                <div class="card-header">
                                    <h3 class="card-title">Enviar Correo Electrónico</h3>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                    <div class="form-group">
                                        <input class="form-control" id="destinatario" readonly="" placeholder="Para:">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" id="titulo" placeholder="Asunto">
                                    </div>
                                    <div class="form-group">
                                        <textarea id="mensaje" rows="5" class="form-control">Hola, Mi nombre es: ${usuario.nombres} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}, y estoy aquí para atender a tu registro de denuncia. 
Este es tu Cód-Denuncia [Aquí el código], puedes hacerle seguimiento mediante el Aplicativo Móvil.
Saludos.  
                                        </textarea> 
                                    </div>
                                </div>
                                <!-- /.card-body -->
                                <div class="card-footer">
                                    <div class="float-right">
                                        <button type="button" onclick="answerRequest();" class="btn btn-primary"><i class="far fa-envelope"></i> Enviar Ahora</button>
                                    </div>
                                </div>
                                <!-- /.card-footer -->
                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>

            <!-- Modal -->
            <div class="modal fade" id="modal-dd">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Detalle Denuncia</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="false"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div class="card card-info">
                                        <div class="card-header">
                                            <h3 class="card-title">Relato de la denuncia</h3>
                                        </div>
                                        <div class="card-body">
                                            <p id="rhd">Aquí el texto</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div class="card card-warning">
                                        <div class="card-header">
                                            <h3 class="card-title">Agraviados</h3>
                                        </div>
                                        <div class="card-body">
                                            <table id="tabla_agraviados" class="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre Completo</th>
                                                        <th>Teléfono</th>
                                                        <th>Información Adicional</th>
                                                        <th>¿tiene protección?</th>
                                                        <th>Juzgado</th>
                                                        <th>Fecha de emisión</th>
                                                        <th>Detalle de la Protección</th>
                                                    </tr>
                                                </thead>
                                                <tbody style="text-align: center">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div class="card card-danger">
                                        <div class="card-header">
                                            <h3 class="card-title">Denunciados</h3>
                                        </div>
                                        <div class="card-body">
                                            <table id="tabla_denunciados" class="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre Completo</th>
                                                        <th>Documento</th>
                                                        <th>Tipo de identificación</th>
                                                        <th>Información Adicional</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- /.modal -->

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Módulo Denuncias</h1>
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Recepción Denuncias</a></li>
                                    <li class="breadcrumb-item active">Ver Denuncias</li>
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
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Listado De Denuncias</h3>
                                    </div>
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                        <table id="TablaDenuncias" class="table table-responsive table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Tipo Den.</th>
                                                    <th>Cód-Denuncia</th>
                                                    <th>Fecha Denuncia</th>
                                                    <th>Hora Denuncia</th>
                                                    <th>Fecha Hechos</th>
                                                    <th>Hora Hechos</th>
                                                    <th>Denunciante</th>  
                                                    <th>Policia</th>
                                                    <th>Distrito</th>
                                                    <th>Dirección</th>
                                                    <th>Referencia</th>
                                                    <th class="text-center">Estado</th>
                                                    <th class="text-center">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>TipoDenuncia</th>
                                                    <th>Cód-Denuncia</th>
                                                    <th>FechaDenuncia</th>
                                                    <th>Hora Denuncia</th>
                                                    <th>Fecha Hechos</th> 
                                                    <th>Hora Hechos</th>
                                                    <th>Denunciante</th>  
                                                    <th>Policia</th>
                                                    <th>Distrito</th>
                                                    <th>Dirección</th>
                                                    <th>Referencia</th>
                                                    <th class="text-center">Estado</th>
                                                    <th class="text-center">Acciones</th>
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
        <!-- DataTable-->
        <script src="../plugins/datatables/jquery.dataTables.js" type="text/javascript"></script>
        <script src="../plugins/datatables-bs4/js/dataTables.bootstrap4.js" type="text/javascript"></script>
        <!-- Script Denuncias -->
        <script src="../js/scriptDenuncias.js" type="text/javascript"></script>
        <!-- AdminLTE App -->
        <script src="../dist/js/adminlte.min.js"></script>
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBiqYBElQofWcQGkoH1A2gF9SEuzFyrtNk&callback=initMap&libraries=&v=weekly"
            async
        ></script>
        <script src="../plugins/sweetalert2/sweetalert2.js" type="text/javascript"></script>
        <script src="../js/scriptAcceso.js" type="text/javascript"></script>
    </body>
</html>
<%
    } else {
        response.sendRedirect("../index.jsp");
    }
%>


