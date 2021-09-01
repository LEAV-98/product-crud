import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fileUpload } from "../helpers/fileUpload";
import { useForm } from "../hooks/useForm";
import { firebase } from "./../firebase/firebase-config";
import Swal from "sweetalert2";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { SideBar } from "./SideBar";
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
export const EditProduct = () => {
  const { productId } = useParams();

  const [editProduct, seteditProduct] = useState({});
  const [formValues, handleInputChange] = useForm({
    title: "",
    description: "",
    imagenUrl: "",
    precio: "",
    uid: "",
  });
  const { title, description, precio } = formValues;
  const [loading, setloading] = useState(false);
  let imgUpload;

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        const newProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        seteditProduct(
          newProducts.filter((product) => product.id === productId)
        );
        setloading(true);
      });

    return () => {
      setloading(false);
      seteditProduct([]);
    };
  }, [productId]);
  const handleEdit = async (e) => {
    e.preventDefault();
    if (title === "" || description === "" || precio === "") {
      console.log("campos vacios conchatumare");
      Swal.fire("Error", "Campos Vacíos, no seas imbecil", "error");

      return;
    }
    const db = firebase.firestore();
    const fileUrl = await fileUpload(imgUpload);
    console.log(fileUrl);
    await db.doc(`products/${editProduct[0].id}`).update({
      ...formValues,
      tipo: document.querySelector("#exampleFormControlSelect2").value,
      imagenUrl: fileUrl,
    });
    Swal.fire("Saved", "Pizza editada con exito", "success");
  };
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <SideBar />
        <main className={classes.content}>
          <div className="container">
            <div className="row">
              {loading && (
                <div className="col-md-6 col-md-8 mx-auto">
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>Editar Producto</h1>
                    <Link to="/products">Volver</Link>
                  </div>

                  <div>
                    <form onSubmit={handleEdit}>
                      <div className="form-group">
                        <label>Nombre Anterior: {editProduct[0].title}</label>
                        <input
                          className="form-control"
                          type="text"
                          value={title}
                          name="title"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Precio Anterior: {editProduct[0].precio}</label>
                        <input
                          className="form-control"
                          type="text"
                          value={precio}
                          name="precio"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Descripción Anterior: <br />{" "}
                          {editProduct[0].description}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={description}
                          name="description"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">
                          Tipo de producto
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect2"
                        >
                          <option>Pizzas</option>
                          <option>Pastas</option>
                          <option>Combos</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <p>Imagen Anterior</p>
                        <img
                          className="img-fluid my-1"
                          src={editProduct[0].imagenUrl}
                          alt="img"
                        />
                        <input
                          className="form-control-file"
                          type="file"
                          onChange={(e) => {
                            imgUpload = e.target.files[0];
                          }}
                        />
                      </div>
                      <button className="btn btn-success">
                        Confirmar Edicion
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
