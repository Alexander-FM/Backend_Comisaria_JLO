<aside class="main-sidebar sidebar-dark-primary elevation-4" style="background-color: #114a39;">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
        <img src="../imagenes/pnp.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
             style="opacity: .8">
        <span class="brand-text font-weight-light" style="color: white;">Comisaria JLO</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="../dist/img/policiapng.png" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block" style="color: white;">${usuario.nombres} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}</a>
                <small style="color: white">Usted es, ${usuario.gradoPNP.nombreGrado}</small>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
                     with font-awesome or any other icon font library -->
                <li id="li_inicio" class="nav-item">
                    <a href="../vistas/inicio.jsp" class="nav-link">
                        <i class="nav-icon fas fa-th"></i>
                        <p style="color: white;">
                            Inicio
                        </p>
                    </a>
                </li>
                <li id="li_grupo_registros" class="nav-item has-treeview menu-close" style="color: white;">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-archive"></i>
                        <p style="color: white;">
                            Registros
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li id="li_policias" class="nav-item">
                            <a href="../vistas/policias.jsp" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p style="color: white;">Policias</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li id="li_gradopnp" class="nav-item">
                            <a href="../vistas/gradoPNP.jsp" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p style="color: white;">Grado PNP</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li id="li_vpd" class="nav-item">
                            <a href="../vistas/vinculoParteDenunciada.jsp" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p style="color: white;">Vínculo Parte Denunciada</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li id="li_tipodenuncia" class="nav-item">
                            <a href="../vistas/tipoDenuncia.jsp" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p style="color: white;">Tipo Denuncia</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li id="li_tipotramite" class="nav-item">
                            <a href="../vistas/tipoTramite.jsp" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p style="color: white;">Tipo Trámite</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li id="li_infoadic" class="nav-item">
                            <a href="../vistas/informacionAdicional.jsp" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p style="color: white;">Información Adicional</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li id="li_grupo_recdenuncias" class="nav-item has-treeview menu-close" style="color: white;">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-inbox"></i>
                        <p style="color: white;">
                            Recepción Denuncias
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li id="li_verdenuncias" class="nav-item">
                            <a href="../vistas/verDenuncias.jsp" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p style="color: white;">Ver Denuncias</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li id="li_grupo_rectramites" class="nav-item has-treeview menu-close">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-envelope-open-text"></i>
                        <p style="color: white;">
                            Recepción Trámites
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li id="li_vertramites" class="nav-item">
                            <a href="../vistas/verTramites.jsp" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p style="color: white;">Ver Trámites</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li id="li_grupo_reportes" class="nav-item has-treeview menu-close">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-chart-line"></i>
                        <p style="color: white;">
                            Reportes
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li id="li_rdenuncias" class="nav-item">
                            <a href="../vistas/reportesDenuncias.jsp" class="nav-link">
                                <i class="fas fa-chart-pie nav-icon"></i>
                                <p style="color: white;">Reportes Denuncias</p>
                            </a>
                        </li>
                        <li id="li_rtramites" class="nav-item">
                            <a href="../vistas/reportesTramites.jsp" class="nav-link">
                                <i class="fas fa-chart-pie nav-icon"></i>
                                <p style="color: white;">Reportes Trámites</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li id="li_grupo_usuarios" class="nav-item has-treeview menu-close">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-users"></i>
                        <p style="color: white;">
                            Gestión Usuarios
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li id="li_loginpnp" class="nav-item">
                            <a href="../vistas/asignarUsuario.jsp" class="nav-link">
                                <i class="fas fa-user-tie nav-icon"></i>
                                <p style="color: white;">Asignar Usuario Policia</p>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="position-relative w-85">
                <div class="toast ml-auto" role="alert" data-delay="7000">
                    <div class="toast-header">
                        <strong class="mr-auto text-primary">Notificación</strong>
                        <small class="text-muted">Hace 2 min</small>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="toast-body"> Hey, Aquí! Se ha ingresado una nueva denuncia, en el distrito. </div>
                </div>
            </div>
        </nav>
        <!-- /.sidebar-menu -->
    </div>

    <!-- /.sidebar -->
</aside>