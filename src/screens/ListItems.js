import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LayersIcon from "@material-ui/icons/Layers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../actions/auth";

export const MainListItems = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("logout");
    dispatch(startLogout());
  };
  return (
    <>
      <div>
        <ListItem button>
          <ListItemIcon>
            <Link className="text-dark" to="/">
              <DashboardIcon />
            </Link>
          </ListItemIcon>
          {/* <ListItemText primary="Dashboard" /> */}
          <Link className="text-dark" to="/">
            Dashboard
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Link className="text-dark" to="/orders">
              <ShoppingCartIcon />
            </Link>
          </ListItemIcon>
          {/* <ListItemText primary="Ordenes" /> */}
          <Link className="text-dark" to="/orders">
            Ordenes
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Link className="text-dark" to="/products">
              <LayersIcon />
            </Link>
          </ListItemIcon>
          {/* <ListItemText primary="Productos" /> */}
          <Link className="text-dark" to="/products">
            Productos
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon onClick={handleLogout}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" onClick={handleLogout} />
        </ListItem>
      </div>
    </>
  );
};
