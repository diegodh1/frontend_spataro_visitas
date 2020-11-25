import React, { useState, useEffect, useRef, forwardRef } from "react";
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
import { CloudUpload } from "@material-ui/icons";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneIcon from "@material-ui/icons/Done";
import BlockIcon from "@material-ui/icons/Block";
import PrintIcon from "@material-ui/icons/Print";
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
//TABLES
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//TABS
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
//ACTIONS
import { registrar_invitado } from "../../redux/actions";
//PRINT
import ReactToPrint from "react-to-print";
//REDIRECT
import { withRouter, Redirect } from 'react-router-dom';
//TABS FOR DASHBOARD
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  table: {
    minWidth: 650,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  dateField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

//COMPONENT TO PRINT
const Print = React.forwardRef((props, ref) => {
  const { invitado } = useSelector((state) => ({
    invitado: state.redux_reducer.invitado,
  }));
  return (
    <div ref={ref} style={{textAlign:'center', marginTop:'10%'}}>
      <p>Tipo Documento: {invitado.tipoDocumento}</p>
      <p>Número Documento: {invitado.numeroDocumento}</p>
      <p>Empresa: {invitado.empresa}</p>
      <p>Fecha Entrada: {new Date(invitado.entrada).toLocaleString()}</p>
      <p>Fecha Salida: {new Date(invitado.salida).toLocaleString()}</p>
    </div>
  );
});

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
  const [fechaSelected, setFechaSelected] = React.useState("");
  const [visitas, setVisitas] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [editarVisitante, setEditarVisitante] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [tiposDocumentos, setTiposDocumentos] = React.useState([]);
  const [empleados, setEmpleados] = React.useState([]);
  const [empleadoID, changeEmpleadoID] = React.useState("");
  const [horas, changeHoras] = React.useState(0);
  const [observacion, changeObservacion] = React.useState("");
  const [registroVisitaID, changeRegistroVisitaID] = React.useState("");
  const [visitFinish, setVisitFinish] = React.useState(false);
  //EDITAR VISITANTE
  const [visitanteIDF, setVisitanteIDF] = React.useState("");
  const [documentIDF, setDocumentIDF] = React.useState("");
  const [nombreF, setNombreF] = React.useState("");
  const [apellidoF, setApellidoF] = React.useState("");
  const [correoF, setCorreoF] = React.useState("");
  const [celularF, setCelularF] = React.useState("");
  const [activoF, setActivoF] = React.useState(false);
  //DOCUMENTOS
  const [documentoNombre, setDocumentoNombre] = React.useState("");
  const [documentoReferencia, setDocumentoReferencia] = React.useState("");
  const [documentoDescripcion, setDocumentoDescripcion] = React.useState("");
  const [documentoFile, setDocumentoFile] = React.useState("");
  const [documentsGuest, setDocumentsGuest] = React.useState([]);
  const [companiesGuest, setCompaniesGuest] = React.useState([]);
  const [companyID, changeCompanyID] = React.useState("");
  const [pdfBase64, setPdfBase64] = React.useState("");
  //PRINTS
  const [printGuest, setPrintGuest] = React.useState(false);
  //tabs
  const [value, setValue] = React.useState(0);
  //REFS
  const ref = useRef();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

    fetch("http://localhost:4000/getAllEmployees/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setEmpleados(response.Payload);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeDocumentoID = (event) => {
    setDocumentoID(event.target.value);
  };

  //OBTENER TODOS LOS EMPLEADOS

  //BUSCAMOS EL USUARIO
  const buscarVisitante = () => {
    //REINICIAMOS LOS ESTADOS
    setExisteVisitante(false);
    let status = 500;
    setVisitante({});
    setVisitanteIDF("");
    setDocumentIDF("");
    setNombreF("");
    setApellidoF("");
    setCelularF("");
    setCorreoF("");
    setActivoF(false);
    //REALIZAMOS LA CONSULTA
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
              setVisitanteIDF(response.Payload.VisitanteID);
              setDocumentIDF(response.Payload.DocumentoID);
              setNombreF(response.Payload.VisitanteNombre);
              setApellidoF(response.Payload.VisitanteApellido);
              setCelularF(response.Payload.VisitanteCelular);
              setCorreoF(response.Payload.VisitanteCorreo);
              setActivoF(response.Payload.VisitanteEstado);
              getDocumentsVisitante(
                response.Payload.VisitanteID,
                response.Payload.DocumentoID
              );
              getCompaniesGuest(
                response.Payload.VisitanteID,
                response.Payload.DocumentoID
              );
            } else {
              setError(true);
              setMessage(response.Message);
            }
          }
        })
        .catch((error) => alert("Error con la conexión al servidor " + error));
    }
  };

  //CREAR VISITANTE
  const crearVisitante = () => {
    let status = 500;
    if (!Number.isInteger(parseInt(visitanteIDF)) || documentIDF == "") {
      if (!Number.isInteger(parseInt(visitanteIDF))) {
        setError(true);
        setMessage("El ID del cliente debe ser numérico");
      } else {
        setError(true);
        setMessage("Debe seleccionar un tipo de documento");
      }
    } else {
      fetch("http://localhost:4000/createGuest", {
        method: "POST",
        body: JSON.stringify({
          VisitanteID: parseInt(visitanteIDF),
          DocumentoID: documentIDF,
          VisitanteNombre: nombreF,
          VisitanteApellido: apellidoF,
          VisitanteCelular: celularF,
          VisitanteCorreo: correoF,
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
            setVisitanteIDF("");
            setDocumentIDF("");
            setNombreF("");
            setApellidoF("");
            setCelularF("");
            setCorreoF("");
            setSuccess(true);
            setMessage(response.Message);
          }
        })
        .catch((error) => alert("Error con la conexión al servidor " + error));
    }
  };
  //EDITAR VISITANTE
  const editarVisit = () => {
    let status = 500;
    if (editarVisitante == true) {
      setEditarVisitante(false);
    } else {
      fetch("http://localhost:4000/updateGuest/", {
        method: "POST",
        body: JSON.stringify({
          VisitanteID: parseInt(visitanteIDF),
          DocumentoID: documentIDF,
          VisitanteNombre: nombreF,
          VisitanteApellido: apellidoF,
          VisitanteCelular: celularF,
          VisitanteCorreo: correoF,
          VisitanteEstado: activoF,
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
            setSuccess(true);
            setMessage(response.Message);
          }
        })
        .catch((error) => alert("Error con la conexión al servidor " + error));
      setEditarVisitante(true);
    }
  };

  //CREAR DOCUMENTO VISITANTE
  const crearDocumentoVisitante = () => {
    let status = 500;
    if (
      !Number.isInteger(parseInt(visitanteIDF)) ||
      documentIDF == "" ||
      documentoNombre == "" ||
      documentoReferencia == ""
    ) {
      if (!Number.isInteger(parseInt(visitanteIDF))) {
        setError(true);
        setMessage("El ID del cliente debe ser numérico");
      } else if (documentoNombre == "") {
        setError(true);
        setMessage("Por favor ingrese un nombre para el documento");
      } else if (documentoReferencia == "") {
        setError(true);
        setMessage("Por favor ingrese una referencia o número del documento");
      } else {
        setError(true);
        setMessage("Debe seleccionar un tipo de documento");
      }
    } else {
      var formData = new FormData();
      formData.append("file", documentoFile);
      formData.append("visitanteID", visitanteIDF);
      formData.append("documentoID", documentIDF);
      formData.append("docNombre", documentoNombre);
      formData.append("docReferencia", documentoReferencia);
      formData.append("docDescripcion", documentoDescripcion);
      fetch("http://localhost:4000/createDocGuest/", {
        method: "POST",
        body: formData, // data can be `string` or {object}!
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
            setSuccess(true);
            setMessage(response.Message);
            setDocumentoNombre("");
            setDocumentoReferencia("");
            setDocumentoDescripcion("");
            getDocumentsVisitante(parseInt(visitanteIDF), documentIDF);
          }
        })
        .catch((error) => alert("Error con la conexión al servidor " + error));
    }
  };
  //GET ALL THE COMPANIES FROM A GUEST
  const getCompaniesGuest = (idVisit, idDoc) => {
    let status = 500;
    setCompaniesGuest([]);
    fetch("http://localhost:4000/getCompaniesGuest/", {
      method: "POST",
      body: JSON.stringify({
        VisitanteID: idVisit,
        DocumentoID: idDoc,
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
          setCompaniesGuest(response.Payload);
        }
      })
      .catch((error) => alert("Error con la conexión al servidor " + error));
  };
  //GET DOCUMENTOS DE VISITANTE
  const getDocumentsVisitante = (idVisit, idDoc) => {
    let status = 500;
    setDocumentsGuest([]);
    fetch("http://localhost:4000/getAllDocumentsFromGuest/", {
      method: "POST",
      body: JSON.stringify({
        VisitanteID: idVisit,
        DocumentoID: idDoc,
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
          setDocumentsGuest(response.Payload);
        }
      })
      .catch((error) => alert("Error con la conexión al servidor " + error));
  };

  //DOWNLOAD FILE
  const downloadFile = (idVisit, idDoc, nombre, path) => {
    console.log(idVisit);
    console.log(idDoc);
    console.log(path);
    let status = 500;
    fetch("http://localhost:4000/getDocumentBase64/", {
      method: "POST",
      body: JSON.stringify({
        VisitanteID: idVisit,
        DocumentoID: idDoc,
        VisitanteDocNombre: nombre,
        VisitanteDocPath: path,
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
          const linkSource = `data:application/pdf;base64,${response.Payload}`;
          const downloadLink = document.createElement("a");
          const fileName = nombre + ".pdf";
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      })
      .catch((error) => alert("Error con la conexión al servidor " + error));
  };
  //CREAR VISITA
  const createGuestCompany = () => {
    if (!Number.isInteger(parseInt(visitanteID)) || documentoID == "") {
      if (documentoID == "") {
        setError(true);
        setMessage("Seleccion un tipo de documento válido!!");
      } else {
        setError(true);
        setMessage("El ID del cliente debe ser numérico");
      }
    } else {
      let status = 500;
      fetch("http://localhost:4000/createGuestCompany/", {
        method: "POST",
        body: JSON.stringify({
          VisitanteID: parseInt(visitanteID),
          DocumentoID: documentoID,
          EmpleadoID: parseInt(empleadoID),
          UsuarioID: usuario.UsuarioID,
          EmpresaID: companyID,
          VisitanteEmpresaHoras: parseInt(horas),
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
            setSuccess(true);
            changeHoras(0);
            changeCompanyID("");
            setMessage(response.Message);
          }
        })
        .catch((error) => alert("Error con la conexión al servidor " + error));
    }
  };
  // GET VISITS
  const getVisits = () => {
    let status = 500;
    let fecha = fechaSelected;
    let fechaInicial = fecha + "T00:00:00Z";
    let fechaFinal = fecha + "T23:59:59Z";
    setVisitas([]);
    fetch("http://localhost:4000/getVisits", {
      method: "POST",
      body: JSON.stringify({
        FechaEntrada: fechaInicial,
        FechaSalida: fechaFinal,
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
          setVisitas(response.Payload);
        }
      })
      .catch((error) => alert("Error con la conexión al servidor " + error));
  };
  const setRegistroID = (id) => {
    changeRegistroVisitaID(id);
    setVisitFinish(true);
  };

  //FINISH VISIT
  const finishGuestCompany = () => {
    let status = 500;
    fetch("http://localhost:4000/finishGuestCompany/", {
      method: "POST",
      body: JSON.stringify({
        VisitanteEmpresaRegistro: registroVisitaID,
        Observaciones: observacion,
      }), // data can be `string` or {object}!
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((response) => {
        if (status !== 200) {
          setVisitFinish(false);
          setError(true);
          setMessage(response.Message);
        } else {
          setVisitFinish(false);
          changeObservacion("");
          setSuccess(true);
          setMessage(response.Message);
          getVisits();
        }
      })
      .catch((error) => alert("Error con la conexión al servidor " + error));
  };

  const createPrintDocument = (item) => {
    let invitado = {
      tipoDocumento: item.DocumentoID,
      numeroDocumento: item.VisitanteID,
      empresa: item.EmpresaID,
      entrada: item.FechaEntrada,
      salida: item.FechaSalida,
    };
    dispatch(registrar_invitado(invitado));
    setPrintGuest(true);
  };

  return (
    <main className={classes.content}>
      <AppBar position="static" style={{ backgroundColor: "#FFFFFF" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="third"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Visitantes" {...a11yProps(0)} />
          <Tab label="Visitas" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
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
                value={documentIDF}
                onChange={(e) => setDocumentIDF(e.target.value)}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="FoundNumeroID"
                label="Número Documento"
                defaultValue=" "
                value={visitanteIDF}
                onChange={(e) => setVisitanteIDF(e.target.value)}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="FoundNombre"
                label="Nombre"
                defaultValue=" "
                value={nombreF}
                onChange={(e) => setNombreF(e.target.value)}
                fullWidth
                disabled={editarVisitante}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="FoundApellido"
                label="Apellido"
                defaultValue=" "
                value={apellidoF}
                onChange={(e) => setApellidoF(e.target.value)}
                fullWidth
                disabled={editarVisitante}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="FoundCelular"
                label="Teléfono"
                defaultValue=" "
                value={celularF}
                onChange={(e) => setCelularF(e.target.value)}
                fullWidth
                disabled={editarVisitante}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="FoundCorreo"
                label="Correo"
                defaultValue=" "
                value={correoF}
                onChange={(e) => setCorreoF(e.target.value)}
                fullWidth
                disabled={editarVisitante}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormControlLabel
                  labelPlacement="top"
                  control={
                    <Switch
                      size="medium"
                      checked={activoF}
                      onChange={(e) => setActivoF(e.target.checked)}
                      name="FoundEstado"
                      disabled={editarVisitante}
                    />
                  }
                  label="Activo"
                />
              </FormControl>
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
                  onClick={() => editarVisit()}
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  startIcon={<CreateIcon />}
                >
                  Editar Visitante
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <h1 style={{ textAlign: "center", color: "#daa520" }}>
                Documentos
              </h1>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="nombreDocumento"
                label="Nombre del Documento"
                value={documentoNombre}
                onChange={(e) => setDocumentoNombre(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="documentoReferencia"
                label="Referencia del documento"
                value={documentoReferencia}
                onChange={(e) => setDocumentoReferencia(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="documentoDescripcion"
                label="Descripción del documento"
                multiline
                value={documentoDescripcion}
                onChange={(e) => setDocumentoDescripcion(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                style={{ marginLeft: "3%" }}
                component="label"
              >
                Anexar documento
                <CloudUpload style={{ fontSize: 30, marginLeft: "3px" }} />
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setDocumentoFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={() => crearDocumentoVisitante()}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<CreateIcon />}
                >
                  Agregar Documento
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#0A0A09" }}>
                      <TableCell style={{ color: "#FFFFFF" }}>
                        Documento
                      </TableCell>
                      <TableCell style={{ color: "#FFFFFF" }}>
                        Referencia
                      </TableCell>
                      <TableCell style={{ color: "#FFFFFF" }}>
                        Descripción
                      </TableCell>
                      <TableCell style={{ color: "#FFFFFF" }}>
                        Descargar
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documentsGuest.map((row) => (
                      <TableRow key={row.VisitanteDocNombre}>
                        <TableCell component="th" scope="row">
                          {row.VisitanteDocNombre}
                        </TableCell>
                        <TableCell>{row.VisitanteDocReferencia}</TableCell>
                        <TableCell>{row.VisitanteDocDescripcion}</TableCell>
                        <TableCell>
                          <IconButton aria-label="descargar">
                            <CloudDownloadIcon
                              fontSize="large"
                              style={{ color: "#2A66F0" }}
                              onClick={() =>
                                downloadFile(
                                  row.VisitanteID,
                                  row.DocumentoID,
                                  row.VisitanteDocNombre,
                                  row.VisitanteDocPath
                                )
                              }
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
            style={{ width: "95%", marginLeft: "2.5%" }}
          >
            <Grid item xs={4}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="documentoID">Tipo de Documento</InputLabel>
                <Select
                  labelId="documentoIDF"
                  id="inputDocumentoIDF"
                  value={documentIDF}
                  onChange={(e) => setDocumentIDF(e.target.value)}
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
            <Grid item xs={4}>
              <TextField
                id="FoundNumeroID"
                label="Número Documento"
                defaultValue=" "
                value={visitanteIDF}
                onChange={(e) => setVisitanteIDF(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="FoundNombre"
                label="Nombre"
                defaultValue=" "
                value={nombreF}
                onChange={(e) => setNombreF(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="FoundApellido"
                label="Apellido"
                defaultValue=" "
                value={apellidoF}
                onChange={(e) => setApellidoF(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="FoundCelular"
                label="Teléfono"
                defaultValue=" "
                value={celularF}
                onChange={(e) => setCelularF(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="FoundCorreo"
                label="Correo"
                defaultValue=" "
                value={correoF}
                onChange={(e) => setCorreoF(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => crearVisitante()}
                  className={classes.button}
                  startIcon={<CreateIcon />}
                >
                  Crear Visitante
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
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
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="empresaID">Empresas Anteriores</InputLabel>
              <Select
                labelId="empresaID"
                id="empresaID"
                value={companyID}
                onChange={(e) => changeCompanyID(e.target.value)}
              >
                {companiesGuest.map((item, key) => {
                  return (
                    <MenuItem value={item.EmpresaID} key={key}>
                      {item.EmpresaID}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="empresaID"
              label="Empresa"
              value={companyID}
              onChange={(e) => changeCompanyID(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="empleadoID">Visita a</InputLabel>
              <Select
                labelId="empleadoID"
                id="empleadoID"
                value={empleadoID}
                onChange={(e) => changeEmpleadoID(e.target.value)}
              >
                {empleados.map((item, key) => {
                  return (
                    <MenuItem value={item.EmpleadoID} key={key}>
                      {item.EmpleadoNombre + " " + item.EmpleadoApellido}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="horaSalida"
              label="Cantida de horas de la visita"
              type="number"
              value={horas}
              onChange={(e) => changeHoras(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => createGuestCompany()}
                className={classes.button}
                startIcon={<CreateIcon />}
              >
                Crear Visita
              </Button>
            </div>
          </Grid>
        </Grid>
        <Divider />
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={3}>
            <TextField
              id="date"
              label="Fecha de Visita"
              type="date"
              fullWidth
              onChange={(e) => setFechaSelected(e.target.value)}
              className={classes.dateField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="BUSCAR" onClick={() => getVisits()}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow style={{ backgroundColor: "#0A0A09" }}>
                    <TableCell style={{ color: "#FFFFFF" }}>
                      Visitante ID
                    </TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>
                      Documento
                    </TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>Entrada</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>Salida</TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>
                      Salida Real
                    </TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>
                      Descargar
                    </TableCell>
                    <TableCell style={{ color: "#FFFFFF" }}>
                      Finalizar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visitas.map((row) => (
                    <TableRow key={row.VisitanteID}>
                      <TableCell component="th" scope="row">
                        {row.VisitanteID}
                      </TableCell>
                      <TableCell>{row.DocumentoID}</TableCell>
                      <TableCell>
                        {new Date(row.FechaEntrada).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(row.FechaSalida).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {row.FechaRealSalida == null
                          ? "Pendiente"
                          : new Date(row.FechaRealSalida).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="descargar"
                          onClick={() => createPrintDocument(row)}
                        >
                          <CloudDownloadIcon
                            fontSize="large"
                            style={{ color: "#2A66F0" }}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {row.RegistroSalida ? (
                          <IconButton
                            aria-label="descargar"
                            disabled={row.RegistroSalida}
                          >
                            <BlockIcon
                              fontSize="large"
                              style={{ color: "#A7A6A6" }}
                              onClick={() =>
                                setRegistroID(row.VisitanteEmpresaRegistro)
                              }
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="descargar"
                            disabled={row.RegistroSalida}
                          >
                            <DoneIcon
                              fontSize="large"
                              style={{ color: "#C60707" }}
                              onClick={() =>
                                setRegistroID(row.VisitanteEmpresaRegistro)
                              }
                            />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </TabPanel>

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
        <DialogTitle
          id="alert-dialog-title-t"
          style={{ color: "green", textAlign: "center" }}
        >
          {"Información"}
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

      <Dialog
        open={visitFinish}
        onClose={() => setVisitFinish(false)}
        aria-labelledby="alert-dialog-title-t"
        aria-describedby="alert-dialog-description-t"
      >
        <DialogTitle
          id="alert-dialog-title-t"
          style={{ color: "green", textAlign: "center" }}
        >
          {"Información"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-t">
            Desea agregar una observación?
          </DialogContentText>
          <br />
          <TextField
            id="observacion"
            label="observacion"
            value={observacion}
            multiline
            onChange={(e) => changeObservacion(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => finishGuestCompany()}
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
        open={printGuest}
        onClose={() => setPrintGuest(false)}
        aria-labelledby="alert-dialog-title-t"
        aria-describedby="alert-dialog-description-t"
      >
        <DialogTitle
          id="alert-dialog-title-t"
          style={{ color: "green", textAlign: "center" }}
        >
          {"Información"}
        </DialogTitle>
        <DialogContent>
          <div style={{ textAlign: "center" }}>
            <ReactToPrint
              trigger={() => (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<PrintIcon />}
                >
                  Imprimir
                </Button>
              )}
              content={() => ref.current}
            />
            <Print ref={ref} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPrintGuest()}
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
