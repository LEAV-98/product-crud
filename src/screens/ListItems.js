import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LayersIcon from "@material-ui/icons/Layers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
export const mainListItems = (
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
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar Sesión" />
    </ListItem>
  </div>
);
