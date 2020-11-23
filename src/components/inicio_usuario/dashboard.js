import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Title from "./Title";
import Link from "@material-ui/core/Link";
import {
  TextField,
  Input,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import UpdateUserAdmin from "./formulario_update";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { useSelector, useDispatch } from "react-redux";
//SELECT
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
//ICONOS
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
//DIVIDER
import Divider from "@material-ui/core/Divider";
//DIALOGS
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//SWITCH
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { usuario, datePick } = useSelector((state) => ({
    usuario: state.redux_reducer.usuario,
    perfiles: state.redux_reducer.perfiles,
  }));
  const [documentoID, setDocumentoID] = React.useState("");
  const [visitante, setVisitante] = React.useState({});
  const [existeVisitante, setExisteVisitante] = React.useState(false);
  const [visitanteID, setVisitanteID] = React.useState("");
  const [error, setError] = React.useState(false);
  const [editarVisitante, setEditarVisitante] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [tiposDocumentos, setTiposDocumentos] = React.useState([]);

  //CARGAMOS LOS TIPOS DE DOCUMENTO APENAS CARGA LA VENTANA
  React.useEffect(() => {
    fetch("http://localhost:4000/getAllDocuments/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setTiposDocumentos(response.Payload);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeDocumentoID = (event) => {
    setDocumentoID(event.target.value);
  };

  //BUSCAMOS EL USUARIO
  const buscarVisitante = () => {
    setExisteVisitante(false);
    let status = 500;
    setVisitante({});
    if (!Number.isInteger(parseInt(visitanteID))) {
      setError(true);
      setMessage("El ID del cliente debe ser numérico");
    } else {
      fetch("http://localhost:4000/getGuest/", {
        method: "POST",
        body: JSON.stringify({
          VisitanteID: parseInt(visitanteID),
          DocumentoID: documentoID,
        }), // data can be `string` or {object}!
      })
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((response) => {
          if (status !== 200) {
            setError(true);
            setMessage(response.Message);
          } else {
            if (response.Payload != null) {
              setVisitante(response.Payload);
              setExisteVisitante(true);
            } else {
              setError(true);
              setMessage(response.Message);
            }
          }
        })
        .catch((error) => alert("Error con la conexión al servidor " + error));
    }
  };

  //EDITAR VISITANTE
  const editarVisita = () => {
    if (editarVisitante == true) {
      setEditarVisitante(false);
    } else {
    }
  };
  //EDITAR ESTADO
  const editarEstadoVisita = (event) => {
    let temp = visitante
    temp.VisitanteEstado = event.target.checked;
    console.log(JSON.stringify(temp))
    setVisitante(temp);
    console.log(JSON.stringify(visitante))
  };

  return (
    <main className={classes.content}>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="documentoID">Tipo de Documento</InputLabel>
            <Select
              labelId="documentoID"
              id="inputDocumentoID"
              value={documentoID}
              onChange={changeDocumentoID}
            >
              {tiposDocumentos.map((item, key) => {
                return (
                  <MenuItem value={item.DocumentoID} key={key}>
                    {item.DocumentoID}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="visitanteID"
            label="Número Documento"
            value={visitanteID}
            onChange={(e) => setVisitanteID(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <IconButton aria-label="BUSCAR" onClick={() => buscarVisitante()}>
            <SearchIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Divider />
      <br />
      <br />
      {existeVisitante ? (
        <Grid
          container
          spacing={2}
          style={{ width: "95%", marginLeft: "2.5%" }}
        >
          <Grid item xs={3}>
            <TextField
              id="FoundDocumentoID"
              label="Tipo Documento"
              defaultValue=" "
              value={visitante.DocumentoID}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="FoundNumeroID"
              label="Número Documento"
              defaultValue=" "
              value={visitante.VisitanteID}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="FoundNombre"
              label="Nombre"
              defaultValue=" "
              value={visitante.VisitanteNombre}
              fullWidth
              disabled={editarVisitante}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="FoundApellido"
              label="Apellido"
              defaultValue=" "
              value={visitante.VisitanteApellido}
              fullWidth
              disabled={editarVisitante}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="FoundCelular"
              label="Teléfono"
              defaultValue=" "
              value={visitante.VisitanteCelular}
              fullWidth
              disabled={editarVisitante}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="FoundCorreo"
              label="Correo"
              defaultValue=" "
              value={visitante.VisitanteCorreo}
              fullWidth
              disabled={editarVisitante}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              labelPlacement="top"
              control={
                <Switch
                  size="medium"
                  checked={visitante.VisitanteEstado}
                  onChange={editarEstadoVisita}
                  name="FoundEstado"
                  disabled={editarVisitante}
                />
              }
              label="Activo"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="FoundFecha"
              label="Fecha Creación"
              value={new Date(
                visitante.VisitanteFechaCreacion
              ).toLocaleDateString()}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => editarVisita()}
                variant="outlined"
                color="secondary"
                className={classes.button}
                startIcon={<CreateIcon />}
              >
                Editar Visitante
              </Button>
            </div>
          </Grid>
        </Grid>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<CreateIcon />}
          >
            Crear Visitante
          </Button>
        </div>
      )}

      <Dialog
        open={error}
        onClose={() => setError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ color: "#8f6b00", textAlign: "center" }}
        >
          {"Información"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setError(false)}
            color="primary"
            variant="outlined"
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        aria-labelledby="alert-dialog-title-t"
        aria-describedby="alert-dialog-description-t"
      >
        <DialogTitle id="alert-dialog-title-t" style={{ color: "green" }}>
          {"Información:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-t">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSuccess(false)}
            color="primary"
            variant="outlined"
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
