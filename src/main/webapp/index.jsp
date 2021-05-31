<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link rel="icon" href="imagenes/pnp_icon.png">
        <title>Comisaria JLO | Iniciar Sesión</title>

        <link href="css/pdfresources.css" rel="stylesheet" type="text/css"/>
        <!-- Font Awesome Icons -->
        <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
        <!-- Data Table -->      
        <link href="plugins/datatables-bs4/css/dataTables.bootstrap4.css" rel="stylesheet" type="text/css"/>
        <link href="plugins/datatables-buttons/css/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css"/>
        <!-- Theme style -->
        <link href="plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css"/>

        <link rel="stylesheet" href="dist/css/adminlte.min.css">
        <!-- Google Font: Source Sans Pro -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
        <script src="plugins/alertifyjs/alertify.min.js" type="text/javascript"></script>
        <link href="plugins/alertifyjs/css/alertify.min.css" rel="stylesheet" type="text/css"/>
    </head>
    <body class="hold-transition login-page" style="background-color: #114a39">
        <div class="login-box">
            <div class="login-logo">
                <a style="color: white" href="#"><b>Comisaría de la Familia </b></a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Identifíquese para iniciar sesión</p>
                    <div class="text-center">
                        <img src="imagenes/pnp.png" width="90"> 
                    </div>
                    <br>       
                    <form id="frmLogin">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" required="" placeholder="Codigo Policial" id="codPolicia">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" required="" placeholder="Contraseña" id="clave">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group mb-3">
                            <select name="combo_comisarias" id="combo_comisarias" required="" class="form-control">
                            </select>                          
                        </div>--> 
                        <div class="row">
                            <div class="col-6">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="remember">
                                    <label for="remember">
                                        Recuérdame
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-6">
                                <button type="submit" class="btn btn-block" style="background-color: #114a39; color: white">Iniciar Sesión <span class="fas fa-sign-in-alt"></span> </button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>
                    <div class="social-auth-links text-center mb-3">
                        <a id="contenedor" href="#" class="btn btn-block btn-sm btn-primary">
                            <i class="fas fa-bell mr-2"></i> Verificación de credenciales
                        </a>
                    </div>
                    <p class="mb-1">
                        <a data-toggle="modal" href="#modal-lg">Olvidé mi contraseña</a>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>

        <div class="modal fade" id="modal-lg">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 style="font-family: Roboto, sans-serif;" class="modal-title">Solicitud para cambio de contraseña</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="false"><i style="margin-top: 8px;" class="far fa-times-circle"></i></span>
                        </button>
                    </div>
                    <div class="card-blue card-outline">
                        <div class="card-body login-card-body">
                            <p class="login-box-msg">¿Olvidaste tu contraseña? Aquí puede recuperar fácilmente una nueva contraseña.</p>
                            <form id="frmSolicitarCambioClave">
                                <div class="input-group mb-3">
                                    <input type="text" required="" id="codigoPolicial" class="form-control" placeholder="Introduce tu código policial">
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-user"></span>
                                        </div>
                                    </div>                            
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <button id="btnChangePass" type="submit" class="btn btn-primary btn-block">Solicitar Nueva Contraseña <i class="fas fa-arrow-right"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- /.login-card-body -->
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <div class="modal fade" id="modal-changePass">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 style="font-family: Roboto, sans-serif;" class="modal-title">Ingrese sus nuevas credenciales</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="false"><i style="margin-top: 8px;" class="far fa-times-circle"></i></span>
                        </button>
                    </div>
                    <div class="card-orange card-outline">
                        <div class="card-body login-card-body">
                            <input type="hidden" id="cp">
                            <p class="login-box-msg">Está a solo un paso de su nueva contraseña, recupere su contraseña ahora.</p>
                            <form id="frmChangePassword">
                                <div class="input-group mb-3">
                                    <input id="pass1" type="password" required="" class="form-control" placeholder="Contraseña">
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input id="pass2" type="password" required="" class="form-control" placeholder="Confirma tu contraseña">
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <button id="btnSaveChange" type="submit" class="btn btn-success btn-block">Cambiar Contraseña <i class="fas fa-check-circle"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- /.login-card-body -->
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <script src="plugins/jquery/jquery.min.js"></script>
        <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="plugins/datatables/jquery.dataTables.js" type="text/javascript"></script>
        <script src="plugins/datatables-bs4/js/dataTables.bootstrap4.js" type="text/javascript"></script>

        <script src="plugins/select2/js/select2.full.min.js" type="text/javascript"></script>

        <script src="dist/js/adminlte.min.js"></script>
        <script src="js/scriptSession.js"></script>
        <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </body>
</html>

