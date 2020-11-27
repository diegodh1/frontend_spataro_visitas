import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  TextField,
  Grid,
  IconButton,
  Popover,
  Slide,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { CheckCircleOutline, DeleteOutline } from "@material-ui/icons";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Done from "@material-ui/icons/Done";
import { createMuiTheme } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5%",
    flexGrow: 1,
  },
  card_root: {
    minWidth: 275,
    marginBottom: "2%",
  },
  card_bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  card_title: {
    fontSize: 14,
  },
  card_pos: {
    marginBottom: 12,
  },
  scroll_grid: {
    height: "500px",
    overflowY: "scroll",
  },
  indicator: {
    backgroundColor: "white",
    color: "red",
  },
}));

export default function Perfiles() {
  const classes = useStyles();
  const [fetch_profiles, set_fetch_profiles] = useState([]);
  const [nombre_profile, set_nombre_profile] = useState("");
  const [descripcion, set_descripcion] = useState("");
  const [nombre_profile_temp, set_nombre_profile_temp] = useState([]);
  const [cargando, set_cargando] = useState(false);
  const [error, set_error] = React.useState(false);
  const [error_message, set_error_message] = useState("");
  const [success, set_success] = React.useState(false);
  const [success_message, set_success_message] = useState("");
  const [activado, set_activado] = useState("Activo");
  const [gilad, set_gilad] = useState(true);
  const [value, setValue] = React.useState(0);
  const [nombre_profile_to_change, set_nombre_profile_to_change] = useState("");
  const vertical = "top";
  const horizontal = "right";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [valueId, set_valueId] = useState(0);
  const componRef = React.useRef();
  const [id_doc, set_id_doc] = useState("");
  const [user_cargado, set_user_cargado] = useState([]);
  const [profiles_from_user, set_prof_from_user] = useState([]);
  const [user_temp, set_user_temp] = useState({});

  const handleClick = (event, valueId) => {
    set_valueId(valueId);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openP = Boolean(anchorEl);
  const id = openP ? "simple-popover" : undefined;

  const set_state_gilad = () => {
    set_gilad(!gilad);
    set_activado(!gilad ? "Activo" : "No activo");
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const add_profile = () => {
    let temp_profiles = nombre_profile_temp;
    temp_profiles.filter((x) => x.ProfileName === nombre_profile).length === 0
      ? temp_profiles.push({
          PermisoID: nombre_profile,
          PermisoDesc: descripcion,
          PermisoEstado: gilad,
        })
      : set_error_message("Ya se ha creado este permiso");
    set_nombre_profile_temp(temp_profiles);
    set_nombre_profile("");
    set_gilad(true);
    set_cargando(true);
  };

  const eliminar_profile_temp = (value) => {
    let temp = nombre_profile_temp;
    for (let i = 0; i < temp.length; i++) {
      if (value === temp[i].PermisoID) {
        temp.splice(i, 1);
      }
    }
    set_nombre_profile_temp(temp);
    set_cargando(false);
  };

  const borrar_perfil = (valueId) => {
    fetch("http://192.168.1.47:4000/updatePermissions", {
      method: "POST",
      body: JSON.stringify({
        PermisoID: valueId,
        PermisoEstado: false,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          set_error(true);
          set_error_message("Error: " + response.error);
          return;
        }
        set_fetch_profiles(response);
        set_success(true);
        set_success_message("Perfil cambiado con éxito");
      })
      .catch((err) => {
        alert("Error en la conexión con el servidor " + err);
      });
  };

  const reactivar_perfil = (valueId) => {
    fetch("http://192.168.1.47:4000/updatePermissions", {
      method: "POST",
      body: JSON.stringify({
        PermisoID: valueId,
        PermisoEstado: true,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          set_error(true);
          set_error_message("Error: " + response.error);
          return;
        }
        set_fetch_profiles(response);
        set_success(true);
        set_success_message("Perfil cambiado con éxito");
      })
      .catch((err) => {
        alert("Error en la conexión con el servidor " + err);
      });
  };

  const guardar_perfil = () => {
    fetch("http://192.168.1.47:4000/createPermission", {
      method: "POST",
      body: JSON.stringify(nombre_profile_temp[0]),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          set_error(true);
          set_error_message("" + response.error);
        }
        set_success(true);
        set_success_message("Permiso agregado con éxito");
        set_nombre_profile_temp([]);
        set_nombre_profile("");
        set_cargando(false);
      })
      .catch((err) => {
        alert("Error en la conexión con el servidor " + err);
      });
  };

  useEffect(() => {
    fetch("http://192.168.1.47:4000/getAllPermissions", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          set_fetch_profiles(response);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  TabPanel.propTypes = {
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  const cambiar_nom_perfil = () => {
    fetch("http://192.168.1.47:4000/updatePermissions", {
      method: "POST",
      body: JSON.stringify({
        PermisoID: valueId,
        PermisoDesc: nombre_profile_to_change,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          set_error(true);
          set_error_message("Error: " + response.error);
          return;
        }
        set_success(true);
        set_success_message("Perfil cambiado con éxito");
        if (response.length > 0) {
          set_fetch_profiles(response);
        }
      })
      .catch((err) => {
        alert("Error en la conexión con el servidor " + err);
      });
  };

  const buscar_id = () => {
    fetch("http://192.168.1.47:4000/getUser/" + id_doc, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        set_user_cargado([response]);
        set_user_temp(response);
        getProfilesFromUser(id_doc);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getProfilesFromUser = (id_doc) => {
    fetch("http://192.168.1.47:4000/getAllUserPermissions/" + id_doc, {
      method: "GET",
    })
      .then((res) => (res.status == 204 ? [] : res.json()))
      .then((response) => {
        if (response.length > 0) {
          set_prof_from_user(
            response.map((element) => {
              return element.PermisoID;
            })
          );
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const quitar_perfil = (valueId) => {
    fetch("http://192.168.1.47:4000/assignPermission", {
      method: "POST",
      body: JSON.stringify({
        PermisoID: valueId,
        UsuarioID: user_temp.UsuarioID,
        UsuarioPermisoEstado: false,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          set_error(true);
          set_error_message("Error: " + response.error);
          return;
        }
        getProfilesFromUser(id_doc);
        set_success(true);
        set_success_message("Permiso borrado con éxito");
      })
      .catch((err) => {
        alert("Error en la conexión con el servidor " + err);
      });
  };

  const asignar_perfil = (valueId) => {
    fetch("http://192.168.1.47:4000/assignPermission", {
      method: "POST",
      body: JSON.stringify({
        PermisoID: valueId,
        UsuarioID: user_temp.UsuarioID,
        UsuarioPermisoEstado: true,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          set_error(true);
          set_error_message("Error: " + response.error);
          return;
        }
        getProfilesFromUser(id_doc);
        set_success(true);
        set_success_message("Permiso asignado con éxito");
      })
      .catch((err) => {
        alert("Error en la conexión con el servidor " + err);
      });
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          className={classes.indicator}
        >
          <Tab label="Crear Permiso" {...a11yProps(0)} />
          <Tab label="Asignar Permisos" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              id="standard-text-permiso"
              label="Nombre del perfil"
              disabled={cargando}
              value={nombre_profile}
              onChange={(e) => set_nombre_profile(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="standard-textarea-permiso"
              multiline
              label="Descripción"
              disabled={cargando}
              value={descripcion}
              onChange={(e) => set_descripcion(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              value={activado}
              control={
                <Switch
                  disabled={cargando}
                  checked={gilad}
                  onChange={(e) => set_state_gilad()}
                />
              }
              label={activado}
              labelPlacement="top"
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              disabled={cargando}
              style={{ color: "green", marginLeft: "1%" }}
              onClick={(e) => add_profile()}
            >
              Agregar
              <CheckCircleOutline
                style={{ fontSize: 30, marginLeft: "10px", color: "green" }}
              />
            </Button>
          </Grid>
        </Grid>
        <h3 style={{ textAlign: "center", color: "gray" }}>
          {" "}
          Permiso a guardar
        </h3>
        <TableContainer component={Paper} style={{ width: "100%" }}>
          <Table stickyHeader={true} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre del permiso</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nombre_profile_temp.map((element) => (
                <TableRow key={element.PermisoID}>
                  <TableCell>{element.PermisoID}</TableCell>
                  <TableCell>{element.PermisoDesc}</TableCell>
                  <TableCell>
                    {element.PermisoEstado ? "Activo" : "No activo"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => eliminar_profile_temp(element.PermisoID)}
                      children={
                        <DeleteOutline
                          style={{
                            fontSize: 25,
                            marginLeft: "8px",
                            color: "red",
                          }}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ textAlign: "center", marginTop: "4%" }}>
          <Button
            style={{ color: "white", backgroundColor: "green" }}
            variant="contained"
            endIcon={<Done />}
            onClick={(e) => guardar_perfil()}
          >
            REGISTRAR PERMISO
          </Button>
        </div>
        <br></br>
        <h3 style={{ textAlign: "center", color: "gray" }}>
          Permisos registrados
        </h3>
        <TableContainer component={Paper} style={{ width: "97%" }}>
          <Table stickyHeader={true} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha de creación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetch_profiles.map((element) => (
                <TableRow key={element.PermisoID}>
                  <TableCell>{element.PermisoID}</TableCell>
                  <TableCell>{element.PermisoDesc}</TableCell>
                  <TableCell>
                    {element.PermisoEstado ? "Activo" : "No activo"}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      element.PermisoFechaCreacion
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleClick(e, element.PermisoID)}
                      children={
                        <EditIcon
                          style={{
                            fontSize: 25,
                            marginLeft: "8px",
                            color: "green",
                          }}
                        />
                      }
                    />
                    <Popover
                      id={id}
                      open={openP}
                      ref={componRef}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography className={classes.typography}>
                        Cambiar descripcion
                      </Typography>
                      <TextField
                        id="cambio-descr"
                        label="Nueva descripción"
                        fullWidth
                        multiline
                        value={nombre_profile_to_change}
                        onChange={(e) =>
                          set_nombre_profile_to_change(e.target.value)
                        }
                      />
                      <IconButton
                        onClick={cambiar_nom_perfil}
                        children={
                          <CheckIcon
                            style={{
                              fontSize: "inherit",
                              marginLeft: "2px",
                              color: "green",
                            }}
                          />
                        }
                      />
                    </Popover>
                  </TableCell>
                  <TableCell>
                    {element.PermisoEstado ? (
                      <IconButton
                        onClick={(e) => borrar_perfil(element.PermisoID)}
                        children={
                          <DeleteOutline
                            style={{
                              fontSize: 25,
                              marginLeft: "8px",
                              color: "red",
                            }}
                          />
                        }
                      />
                    ) : (
                      <IconButton
                        onClick={(e) => reactivar_perfil(element.PermisoID)}
                        children={
                          <AddCircleIcon
                            style={{
                              fontSize: 25,
                              marginLeft: "8px",
                              color: "green",
                            }}
                          />
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={4}></Grid>
          <Grid item xs={3}>
            <TextField
              id="standard-txt"
              label="Numero de documento"
              fullWidth
              type="number"
              value={id_doc}
              onChange={(e) => set_id_doc(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Button style={{ marginLeft: "1%" }} onClick={buscar_id}>
              <SearchIcon style={{ fontSize: 30, marginLeft: "10px" }} />
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <h3 style={{ textAlign: "center", color: "gray" }}></h3>
        <TableContainer component={Paper} style={{ width: "100%" }}>
          <Table stickyHeader={true} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Num. Documento</TableCell>
                <TableCell>Nombre </TableCell>
                <TableCell>Apellido </TableCell>
                <TableCell> Estado </TableCell>
                <TableCell>Fecha de creación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user_cargado.map((element) => (
                <TableRow key={element.UsuarioID}>
                  <TableCell>{element.UsuarioID}</TableCell>
                  <TableCell>{element.UsuarioNombre}</TableCell>
                  <TableCell>{element.UsuarioApellido}</TableCell>
                  <TableCell>
                    {element.UsuarioEstado ? "Activo" : "No activo"}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      element.UsuarioFechaCreacion
                    ).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <h3 style={{ textAlign: "center", color: "gray" }}>
          Permisos Asignados
        </h3>
        <TableContainer component={Paper} style={{ width: "97%" }}>
          <Table stickyHeader={true} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha de creación</TableCell>
                <TableCell>Asignado/Asignar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user_cargado.length > 0
                ? fetch_profiles.map((element) => (
                    <TableRow key={element.PermisoID}>
                      <TableCell>{element.PermisoID}</TableCell>
                      <TableCell>{element.PermisoDesc}</TableCell>
                      <TableCell>
                        {element.PermisoEstado ? "Activo" : "No activo"}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          element.PermisoFechaCreacion
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {profiles_from_user.length > 0 ? (
                          profiles_from_user.includes(element.PermisoID) ? (
                            <IconButton
                              onClick={(e) => quitar_perfil(element.PermisoID)}
                              children={
                                <CheckBoxIcon
                                  style={{ fontSize: 25, marginLeft: "5px" }}
                                />
                              }
                            />
                          ) : (
                            <IconButton
                              onClick={(e) => asignar_perfil(element.PermisoID)}
                              children={
                                <CheckBoxOutlineBlankIcon
                                  style={{ fontSize: 25, marginLeft: "5px" }}
                                />
                              }
                            />
                          )
                        ) : (
                          <IconButton
                            onClick={(e) => asignar_perfil(element.PermisoID)}
                            children={
                              <CheckBoxOutlineBlankIcon
                                style={{ fontSize: 25, marginLeft: "5px" }}
                              />
                            }
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <Snackbar
        open={error}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={() => set_error(false)}
          variant="filled"
          severity="error"
        >
          {error_message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={() => set_success(false)}
          variant="filled"
          style={{ backgroundColor: "white", color: "black" }}
        >
          {success_message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
