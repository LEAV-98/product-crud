import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebase } from "./../firebase/firebase-config";
export const PrincipalScreen = () => {
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
    firebase
      .firestore()
      .collection("products")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Eliminado con exito");
      })
      .catch((e) => console.log(e));
    cargarProductos();
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <h1>Principal Screen</h1>
        <Link to="/add">Agregar Producto</Link>
      </nav>

      <div className="container">
        <div className="row">
          {products.map((product, id) => (
            <div className="card col-sm-6 col-md-4" key={id}>
              <img className="card-img-top" src={product.imagenUrl} alt="img" />
              <div className="card-body">
                <h3 className="card-title">Nombre: {product.title}</h3>
                <p className="card-text">Precio: ${product.precio}</p>
                <p>Descripción: {product.description}</p>
                <div className="btn-group " role="group">
                  <Link className="btn btn-success" to={`/edit/${product.id}`}>
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
    </>
  );
};
