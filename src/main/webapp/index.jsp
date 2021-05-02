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
        <!--<link href="https://www.apple.com/wss/fonts?families=SF+Pro,v3|SF+Pro+Icons,v3">-->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
        <script src="plugins/alertifyjs/alertify.min.js" type="text/javascript"></script>
        <link href="plugins/alertifyjs/css/alertify.min.css" rel="stylesheet" type="text/css"/>
    </head>
    <body class="hold-transition login-page" style="background-color: #114a39">
        <div class="login-box">
            <div class="login-logo">
                <a style="color: white" href="#"><b>Comisaría </b>JLO</a>
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
                            <input type="text" class="form-control" placeholder="Codigo Policial" id="codPolicia">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Contraseña" id="clave">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="remember">
                                    <label for="remember">
                                        Recuérdame
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-block" style="background-color: #114a39; color: white"><i class="fas fa-sign-in-alt"></i> Iniciar</button>
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
                        <a href="#">Olvidé mi contraseña</a>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
        
        <script src="plugins/jquery/jquery.min.js"></script>
        <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    
        <script src="plugins/datatables/jquery.dataTables.js" type="text/javascript"></script>
        <script src="plugins/datatables-bs4/js/dataTables.bootstrap4.js" type="text/javascript"></script>
    
        <script src="plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
        
        <script src="dist/js/adminlte.min.js"></script>
        <script src="js/scriptSession.js"></script>
        <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    </body>
</html>

