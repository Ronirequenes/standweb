import React from "react";
import {
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const TarjetasProductos = ({
  productos,
  categorias,
  abrirModalEdicion,
  abrirModalEliminacion,
}) => {
  const obtenerNombreCategoria = (
    idCategoria
  ) => {
    const categoria =
      categorias.find(
        (cat) =>
          cat.id_categoria ===
          idCategoria
      );

    return categoria
      ? categoria.nombre_categoria
      : "Sin categoría";
  };

  return (
    <Row>
      {productos.map((producto) => (
        <Col
          key={producto.id_producto}
          xs={12}
          md={6}
          lg={4}
          className="mb-4"
        >
          <Card className="h-100 shadow-sm">
            {producto.url_imagen && (
              <Card.Img
                variant="top"
                src={producto.url_imagen}
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            )}

            <Card.Body>
              <Card.Title>
                {
                  producto.nombre_producto
                }
              </Card.Title>

              <Card.Text>
                <strong>
                  Categoría:
                </strong>{" "}
                {obtenerNombreCategoria(
                  producto.categoria_producto
                )}
              </Card.Text>

              <Card.Text>
                <strong>
                  Precio:
                </strong>{" "}
                C$
                {parseFloat(
                  producto.precio_venta
                ).toFixed(2)}
              </Card.Text>

              <Card.Text>
                {
                  producto.descripcion_producto
                }
              </Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between">
              <Button
                variant="warning"
                size="sm"
                onClick={() =>
                  abrirModalEdicion(
                    producto
                  )
                }
              >
                Editar
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  abrirModalEliminacion(
                    producto
                  )
                }
              >
                Eliminar
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TarjetasProductos;