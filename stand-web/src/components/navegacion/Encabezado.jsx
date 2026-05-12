import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

import logo from "../../assets/logo.png";
import { supabase } from "../../database/supabaseconfig";

const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  const cerrarSesion = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      localStorage.removeItem("usuario-supabase");
      setMostrarMenu(false);
      navigate("/login");
    } catch (err) {
      console.error("Error cerrando sesión:", err.message);
    }
  };

  const esLogin = location.pathname === "/login";
  const esCatalogo =
    location.pathname === "/catalogo" &&
    localStorage.getItem("usuario-supabase") === null;

  let contenidoMenu;

  if (esLogin) {
    contenidoMenu = (
      <Nav className="ms-auto pe-2">
        <Nav.Link onClick={() => manejarNavegacion("/login")}>
          <i className="bi-person-fill-lock me-2"></i>
          Iniciar sesión
        </Nav.Link>
      </Nav>
    );
  } else if (esCatalogo) {
    contenidoMenu = (
      <Nav className="ms-auto pe-2">
        <Nav.Link onClick={() => manejarNavegacion("/catalogo")}>
          <i className="bi-images me-2"></i>
          Catálogo
        </Nav.Link>
      </Nav>
    );
  } else {
    contenidoMenu = (
      <Nav className="ms-auto pe-2">
        <Nav.Link onClick={() => manejarNavegacion("/")}>
          Inicio
        </Nav.Link>

        <Nav.Link onClick={() => manejarNavegacion("/categorias")}>
          Categorías
        </Nav.Link>

        <Nav.Link onClick={() => manejarNavegacion("/productos")}>
          Productos
        </Nav.Link>

        <Nav.Link onClick={() => manejarNavegacion("/catalogo")}>
          Catálogo
        </Nav.Link>

        <Nav.Link onClick={cerrarSesion}>
          <i className="bi-box-arrow-right"></i>
        </Nav.Link>
      </Nav>
    );
  }

  return (
    <Navbar expand="md" fixed="top" className="color-navbar" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/")}
          style={{ cursor: "pointer" }}
          className="d-flex align-items-center text-white"
        >
          <img src={logo} width="40" height="40" className="me-2" alt="logo" />
          <strong>Discosa</strong>
        </Navbar.Brand>

        {!esLogin && <Navbar.Toggle onClick={manejarToggle} />}

        <Navbar.Offcanvas
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>{contenidoMenu}</Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;