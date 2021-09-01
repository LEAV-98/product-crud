import { CssBaseline, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../firebase/firebase-config";
import { SideBar } from "./SideBar";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    paddingTop: "5rem",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));
export const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const cargarProductos = () => {
    firebase
      .firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        const newProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(newProducts);
      });
  };
  useEffect(() => {
    cargarProductos();
    return () => {
      setProducts([]);
    };
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `Don't save`,
      cancelButtonText: "No",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        firebase
          .firestore()
          .collection("products")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Eliminado con exito");
          })
          .catch((e) => console.log(e));
        Swal.fire("Eliminado", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    cargarProductos();
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar />
      <main className={classes.content}>
        <div className="container ">
          <Link to="/add" className="btn btn-primary my-3">
            Agregar Producto
          </Link>

          <div className="row">
            {products.map((product, id) => (
              <div className="card col-sm-6 col-md-4" key={id}>
                <img
                  className="card-img-top"
                  src={product.imagenUrl}
                  alt="img"
                />
                <div className="card-body">
                  <h3 className="card-title">Nombre: {product.title}</h3>
                  <p className="card-text">Precio: ${product.precio}</p>
                  <p className="card-text">Tipo: {product.tipo}</p>
                  <p>Descripción: {product.description}</p>
                  <div className="btn-group " role="group">
                    <Link
                      className="btn btn-success"
                      to={`/edit/${product.id}`}
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
