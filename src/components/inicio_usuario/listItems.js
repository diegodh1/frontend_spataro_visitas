import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { set_navbar } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export function MainListItems() {
  const { perfiles } = useSelector((state) => ({
    perfiles: state.redux_reducer.perfiles,
  }));
  const isAdmin = () => {
    for(let i = 0; i<perfiles.length; i++){
      if(perfiles[0].PermisoID =="ADMINISTRADOR"){
        return true
      }
    }
    return false
  }
  return (
    <div>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Mi información" />
      </ListItem>
      {isAdmin() ? (
        <ListItem button component={Link} to="/admin/usuarios">
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
      ) : null}
      {isAdmin() ? (
        <ListItem button component={Link} to="/admin/permisos">
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Permisos" />
        </ListItem>
      ) : null}
    </div>
  );
}
