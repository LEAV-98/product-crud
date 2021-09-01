import React from "react";
import { useForm } from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLoginEmailPassword } from "../actions/auth";
export const LoginScreen = () => {
  const [inputValues, handleInputChange] = useForm({
    email: "admin@admin.com",
    password: "admin123",
  });
  const dispatch = useDispatch();
  const { email, password } = inputValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <form className="col-md-6 col-sm-12 mx-auto" onSubmit={handleLogin}>
          <h1 className="text-center">
            Sistema de Administración de Pizza App
          </h1>
          <h3 className="text-center">Iniciar Sesión</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Usuario"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Ingresar" className="btn btn-success" />
          </div>
        </form>
      </div>
    </div>
  );
};
