import React from "react";
import { Link } from "react-router-dom";
import { fileUpload } from "../helpers/fileUpload";
import { useForm } from "../hooks/useForm";
import { firebase } from "./../firebase/firebase-config";
import Swal from "sweetalert2";

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
        imagenUrl: fileUrl,
      });
    Swal.fire("Saved", "Pizza añadida con exito", "success");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-8 mx-auto">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Add Product</h1>
              <Link to="/">Volver</Link>
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
    </>
  );
};
