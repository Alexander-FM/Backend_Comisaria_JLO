<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page session="true" %>
<%
    if (request.getSession().getAttribute("usuario") != null) {
%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <%@include file="plus/head.html" %>
    </head>
    <body class="hold-transition sidebar-mini">
        <input type="hidden" id="idComisaria" value="${idComisarias}">
        <div class="wrapper">
            <%@include file="plus/menuSuperior.jsp" %>
            <%@include  file="plus/menuLateral.jsp"%>

            <div class="modal fade" id="modal-at"><!-- at = actualizar Trámite-->
                <input type="hidden" id="idAC" value="0">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Actualizar Datos Trámite</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="false"></span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <div class="form-group">
                                        <label>Asignar Policía</label>
                                        <select id="combo_policias_tramites" style="width: 100%" class="select2 form-control" data-placeholder="Seleccionar">                                               
                                            <!-- Cargar desde la base de datos -->
                                            <option>Cargando . . .</option>
                                        </select>  
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <div class="form-group">
                                        <label>Código Trámite</label>
                                        <input maxlength="6" required="" id="codTramite" type="text" placeholder="Ingrese Cód. Trámite" class="form-control">
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <label>Cambiar Estado Trámite</label>
                                    <div class="form-group">                           
                                        <input id="estadotramite" style="margin-top: 10px" type="checkbox" checked="" class="checkbox"> Diligenciada/Pendiente
                                    </div>
                                    <input type="hidden" id="fechaTramite">
                                    <input type="hidden" id="horaTramite">
                                    <input type="hidden" id="usuarioId">
                                    <input type="hidden" id="tipoTramiteId">
                                    <input type="hidden" id="correoUser">
                                    <input type="hidden" id="comisariaId">
                                    <input type="hidden" id="motivoDenuncia">
                                    <input type="hidden" id="observaciones">
                                    <input type="hidden" id="solicitante">
                                    <input type="hidden" id="telefono">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div class="alert alert-dismissible" style="background-color: #114a39; color: white">
                                        <button style="color: white" type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                        <h5><i class="icon fas fa-info"></i> Alerta!</h5>
                                        <p> Si el tipo de trámite es <b>Copia Certificada</b>, 
                                            por favor, asignar C-"Cód-Trámite"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button id="btn-save" onclick="registrar()" type="button" class="btn btn-primary" data-dismiss="modal">Actualizar Trámite</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal para enviar correo de trámite atendido -->
            <!-- Modal para el envio de correo electronicos -->
            <div class="modal fade" id="modal-correo-tramite">
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
                                        <textarea id="mensaje" rows="5" class="form-control">Hola, Mi nombre es: ${usuario.nombres} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}, y estoy aquí para atender a tu solicitud de trámite de copia certificada. 
Este es tu Cód-Tramite: [Aquí el código], puedes hacerle seguimiento mediante el Aplicativo Móvil.
Saludos.  
                                        </textarea>                                                                           
                                    </div>
                                </div>
                                <!-- /.card-body -->
                                <div class="card-footer">
                                    <div class="float-right">
                                        <button type="button" onclick="sendEmail();" class="btn btn-primary"><i class="far fa-envelope"></i> Enviar Ahora</button>
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
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Módulo Trámites</h1>
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="inicio.jsp">Inicio</a></li>
                                    <li class="breadcrumb-item active">Ver Trámites</li>
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
                                        <h3 class="card-title">Listado De Trámites</h3>
                                    </div>
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                        <table id="TablaTramites" class="table table-responsive table-bordered table-hover">
                                            <thead>
                                                <tr class="text-center">
                                                    <th>Id</th>
                                                    <th>Cod-Trámite</th>
                                                    <th>Fecha Trámite</th>
                                                    <th>Hora Trámite</th>
                                                    <th>Policia</th>
                                                    <th>Tipo Trámite</th>
                                                    <th>Estado</th>
                                                    <th>Solicitante</th>
                                                    <th>Usuario</th>
                                                    <th>Telefono</th>
                                                    <th>Motivo Denuncia</th>
                                                    <th>Observaciones</th>                          
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot>
                                                <tr class="text-center">
                                                    <th>Id</th>
                                                    <th>Cod-Trámite</th>
                                                    <th>Fecha Trámite</th>
                                                    <th>Hora Tramite</th>
                                                    <th>Policia</th>
                                                    <th>Tipo Trámite</th>
                                                    <th>Estado</th>
                                                    <th>Solicitante</th>
                                                    <th>Usuario</th>
                                                    <th>Telefono</th>
                                                    <th>Motivo Denuncia</th>
                                                    <th>Observaciones</th>                          
                                                    <th>Acciones</th>
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
            <form id="frmPrintTramite" action="../tramite?accion=ImprimirTramite" method="post" target="_blank">
                <input type="hidden" name="tramite" id="tramite">
            </form>
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
        <script src="../plugins/jquery/jquery.min.js"></script>
        <!-- Bootstrap 4 -->
        <script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
        <!-- DataTable-->
        <script src="../plugins/datatables/jquery.dataTables.js" type="text/javascript"></script>
        <script src="../plugins/datatables-bs4/js/dataTables.bootstrap4.js" type="text/javascript"></script>
        <!-- AdminLTE App -->
        <script src="../dist/js/adminlte.min.js"></script>
        <script type="text/javascript" src="../js/scriptTramite.js"></script>
        <script src="../plugins/sweetalert2/sweetalert2.js" type="text/javascript"></script>
        <script src="../js/scriptAcceso.js" type="text/javascript"></script>
    </body>
</html>
<%
    } else {
        response.sendRedirect("../index.jsp");
    }
%>



