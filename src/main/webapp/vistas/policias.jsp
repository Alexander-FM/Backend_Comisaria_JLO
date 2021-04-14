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
        <div class="wrapper">
            <%@include file="plus/menuSuperior.jsp" %>
            <%@include  file="plus/menuLateral.jsp"%>
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Módulo Policias</h1>
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="inicio.jsp">Inicio</a></li>
                                    <li class="breadcrumb-item active">Policias</li>
                                </ol>
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Modal -->
                <div class="modal fade" id="modal-lg">
                    <input type="hidden" id="idP" value="0">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Formulario De Registro</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6"> 
                                        <div class="form-group">
                                            <label>Nombres Completos</label>
                                            <input id="nombres" type="text" placeholder="Ingrese sus Nombres" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>Apellido Materno</label>
                                            <input id="apellidoMaterno" type="text" placeholder="Ingrese su Apellido Materno" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>Seleccionar Género</label>
                                            <select id="combo_genero_policia" style="width: 100%" class="form-control" data-placeholder="Seleccionar">                                               
                                                <!-- Cargar desde la base de datos -->
                                                <option value="M">Hombre</option>
                                                <option value="F">Mujer</option>
                                            </select> 
                                        </div>
                                        <!--<label style="margin-top: 2px;">Seleccionar Género</label>
                                        <div class="form-group" style=" margin-top: 10px; margin-bottom: 20px">                                           
                                            <input type="radio" name="genero" id="masculino" value="Masculino"> Masculino
                                            <input type="radio" name="genero" id="femenino" style="margin-left: 30px" value="Femenino"> Femenino
                                        </div>--> 
                                        <div class="form-group">
                                            <label>Número Telefónico</label>
                                            <input maxlength="9" id="telefonoPolicia" type="text" placeholder="Ingrese N.º Telefónico" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>Direccion</label>
                                            <input id="direcciopolicia" type="text" placeholder="Ingrese Dirección" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>Seleccionar Estado Civil</label>
                                            <select id="combo_estado_civil" style="width: 100%" class="select2 form-control" data-placeholder="Seleccionar">                                               
                                                <!-- Cargar desde la base de datos -->
                                                <option>Cargando . . .</option>
                                            </select>  
                                        </div>                                       
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Apellido Paterno</label>
                                            <input id="apellidoPaterno" type="text" placeholder="Ingrese su Apellido Paterno" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>Seleccionar Distrito</label>
                                            <select id="combo_distrito" style="width: 100%" class="select2 form-control" data-placeholder="Seleccionar">                                               
                                                <!-- Cargar desde la base de datos -->
                                                <option>Cargando . . .</option>
                                            </select>  
                                        </div>
                                        <div class="form-group">
                                            <label>Seleccionar Grado PNP</label>
                                            <select id="combo_grado" style="width: 100%" class="select2 form-control" data-placeholder="Seleccionar">                                               
                                                <!-- Cargar desde la base de datos -->
                                                <option>Cargando...</option>
                                            </select>  
                                        </div>
                                        <div class="form-group">
                                            <label>Número Identificación</label>
                                            <input maxlength="8" id="numIdentificacion" type="text" placeholder="Ingrese N.º Identificación" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>Fecha Nacimiento</label>
                                            <input id="telefonoPolicia" type="date" placeholder="Ingrese Fecha Nacimiento" class="form-control">
                                        </div>
                                        <label>Estado del Policía</label>
                                        <div class="form-group">                           
                                            <input id="estadoPol" style="margin-top: 10px" type="checkbox" checked="" class="checkbox"> Vigente
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer justify-content-between">
                                <button id="btn-save" onclick="registrar()" type="button" class="btn btn-primary"><i class="fas fa-save"></i> Registrar Policia</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
                <!-- /.Modal -->
                <!-- Main content -->
                <div class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Registrar Policias</h3>
                                    </div>
                                    <div class="card-body">
                                        <button disabled id="btnRegistrarPolicia" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#modal-lg"><i class="fas fa-file-signature"></i> Nuevo Registro</button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Listado De Policias</h3>
                                    </div>
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                        <table id="TablaPolicias" class="table table-bordered table-hover nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Nombres Completos</th>
                                                    <th>Distrito</th>
                                                    <th>Grado PNP</th>
                                                    <th class="text-center">Estado</th>
                                                    <th class="text-center">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Nombres Completos</th>
                                                    <th>Distrito</th>
                                                    <th>Grado PNP</th>
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
        <!-- Script Policias -->
        <!-- Select 2 -->
        <script src="../plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
        <!-- AdminLTE App -->
        <script src="../dist/js/adminlte.min.js"></script>
        <script type="text/javascript" src="../js/scriptPolicia.js"></script>
    </body>
</html>
<%
    } else {
        response.sendRedirect("../index.jsp");
    }
%>



