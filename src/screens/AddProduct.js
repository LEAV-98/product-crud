import React from "react";
import { Link } from "react-router-dom";
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
export const AddProduct = () => {
  const [formValues, handleInputChange] = useForm({
    title: "",
    description: "",
    precio: "",
  });
  const { title, description, precio } = formValues;
  let imgUpload;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileUrl = await fileUpload(imgUpload);
    console.log(fileUrl);
    firebase
      .firestore()
      .collection("products")
      .add({
        ...formValues,
        tipo: document.querySelector("#exampleFormControlSelect2").value,
        imagenUrl: fileUrl,
      });
    Swal.fire("Saved", "Pizza añadida con exito", "success");
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
              <div className="col-md-6 col-md-8 mx-auto">
                <div className="d-flex justify-content-between align-items-center">
                  <h1>Añadir Producto</h1>
                  <Link to="/products">Volver</Link>
                </div>

                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        value={title}
                        name="title"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Precio</label>
                      <input
                        className="form-control"
                        type="text"
                        value={precio}
                        name="precio"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Descripción</label>
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
                      <p>Imagen </p>
                      <input
                        className="form-control-file"
                        type="file"
                        onChange={(e) => {
                          imgUpload = e.target.files[0];
                        }}
                      />
                    </div>
                    <button className="btn btn-success">Añadir</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
