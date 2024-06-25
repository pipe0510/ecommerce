function cargarMenu() {
    document.write(`
        <nav class="nav">
            <div class="container"> 
                <div class="title">Tienda Online</div> 
                <ul class="menu">
                    <li><a href="dashboard.html">Inicio</a></li>
                    <li class="dropdown">
                        <a href="#">Servicios</a>
                        <ul class="dropdown-menu">
                            <li><a href="ciberseguridad.html">Ciberseguridad</a></li>
                            <li><a href="hogar.html">Hogar</a></li>
                            <li><a href="movil.html">Móvil</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#">Cuenta</a>
                        <ul class="dropdown-menu">
                            <li><a href="login.html">Iniciar sesión</a></li>
                            <li><a href="#" data-toggle="modal" data-target="#modalCrearUsuario">Crear usuario</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Contacto</a></li>
                    <li><a href="#" id="cerrarSesion" onclick="cerrar()">Cerrar sesión</a></li>
                    <li>
                        <a href="#"><i class="fas fa-shopping-cart"></i>Carrito</a>
                        <ul class="dropdown-menu" id="carrito">
                            <!-- Aquí se mostrarán los productos del carrito -->
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    `);
}