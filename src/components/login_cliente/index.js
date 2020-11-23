import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//import logo from '../../images/logo.png';
//import presentacion from '../../images/presentacion.mp4';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import cover from "../../images/cover.png";
import chef1 from "../../images/chef1.jpg";
import chef2 from "../../images/chef2.jpg";
import chef3 from "../../images/chef3.jpg";
import video from "../../images/coverVideo.mp4";
import logo from "../../images/logo.png";
import restaurante from "../../images/restaurante.jpg";
import Fab from "@material-ui/core/Fab";
import SignIn from './login';
//CARD
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Input, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import { success_login_client, set_coordinates } from "../../redux/actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search_location from '../mapas/search_location';
import LockIcon from '@material-ui/icons/Lock';
// webfontloader configuration object. *REQUIRED*.
const config = {
  google: {
    families: ["Source Sans Pro:300,600"],
  },
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  rootCard: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  input: {
		width: '100%',
		margin: '1%'
  }
}));

const Login_cliente = () => {
  const {nav_bar, client, coordenadas} = useSelector((state) => ({
    nav_bar: state.redux_reducer.nav_bar,
    client: state.redux_reducer.client,
    coordenadas: state.redux_reducer.coordenadas
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openDS, setOpenDS] = React.useState(false);
  const [openDU, setOpenDU] = React.useState(false);
  const [openDC, setOpenDC] = React.useState(false);
  const [edit, setEdit] = React.useState(true);
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [tel, setTel] = React.useState(0);
  const [mail, setMail] = React.useState("");
  const [sex, setSex] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [open_success, set_open_sucess] = React.useState(false);
  const [message, set_message] = React.useState("");
  const [message_success, set_message_success] = React.useState("");
  const vertical = "top";
  const horizontal = "right";
  const [date, setDate] = React.useState(null);
  const [contrasenhaNew, set_contrasenhaNew] = useState('');
  const [contrasenhaOld, set_contrasenhaOld] = useState('');
  const [showPassword, set_showPassword] = useState(false);
  const perfomChange = (event) => {
    if(window.confirm("¿Desea cambiar la contraseña?")){
      fetch('http://localhost:4000/updateClientPassword', {
        method: 'POST',
        body: JSON.stringify({
          ClientID: client.clientInfo.Payload.Id,
          DocumentTypeID: client.clientInfo.Payload.DocType,
          OldPassword: contrasenhaOld,
          NewPassword: contrasenhaNew
        })      
    }).then(res => res.json())
        .then(response => {
                if(response.error){
                  set_message("No se realizo la operación: " + response.error);
                  setOpen(true);
                }else{
                  set_open_sucess(true);
                  set_message_success('Contraseña cambiada con éxito');
                }
        })
        .catch(err => {
         
        })
        set_contrasenhaNew('');
        set_contrasenhaOld('');
        setOpenDC(false);
    }
}


  const updateClient = () => {
    let status;
    fetch("http://localhost:4000/updateClient", {
        method: "POST",
        body: JSON.stringify({
          ClientID: client.clientInfo.Payload.Id,
          ClientName: name,
          LastName: lastName,
          ClientPhone: tel,
          ClientEmail: mail,
          ClientSex: sex==="M",
          ClientLatitude: parseFloat(coordenadas.lat),
          ClientLongitude: parseFloat(coordenadas.lng),
          DocumentTypeID: client.clientInfo.Payload.DocType,
          ClientBirthDate: date
        }), // data can be `string` or {object}!
      })
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((response) => {
          if (status === 400) {
            set_message("No se realizo la operación: " + response.error);
            setOpen(true);
          } else {
            set_message_success("Hecho");
            dispatch(
              success_login_client(
                {
                  Payload: {
                    ...client.clientInfo.Payload,
                    ClientName: name,
                    LastName: lastName,
                    ClientPhone: tel,
                    ClientEmail: mail,
                    ClientSex: sex,
                    ClientBirthDate: date
                  },
                  Message: "Ingreso Realizado!",
                },
                200
              )
            );
            setOpenDU(false);
            set_open_sucess(true);
          }
        })
        .catch((error) => {
          alert(error);
        });
  };

  const handleCloseDS = () => {
    setOpenDS(false);
  };

  const handleCloseDU = () => {
    setOpenDU(false);
    setEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSucess = () => {
    set_open_sucess(false);
  };

  const handleMouseDownPassword = (event) => {
		event.preventDefault();
  };

  const updateDialog = () => {
    setName(client.clientInfo.Payload.ClientName);
    setLastName(client.clientInfo.Payload.LastName);
    setTel(client.clientInfo.Payload.ClientPhone);
    setMail(client.clientInfo.Payload.ClientEmail);
    setSex(client.clientInfo.Payload.ClientSex?"M":"F");
    setOpenDU(true);
    setDate(new Date(client.clientInfo.Payload.Birthdate));
    dispatch(set_coordinates({ lat: client.clientInfo.Payload.ClientLatitude, lng: client.clientInfo.Payload.ClientLongitude }));
  }

  return (
      <Box>
        <AppBar
          position="sticky"
          style={{
            top: 0,
            left: 0,
            margin: 0,
            background: "black",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <RestaurantMenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {"Al Sazón de la Paloma"+(client.status==200?" - ¡Bienvenido, "+client.clientInfo.Payload.ClientName+" "+client.clientInfo.Payload.LastName+"!":"")}
            </Typography>
            {nav_bar==='principal'?null:<Button color="inherit" onClick={e => setOpenDC(true)}><LockIcon/></Button>}
            {nav_bar==='principal'?null:<Button color="inherit" onClick={updateDialog}><AccountCircleIcon/></Button>}
            <Button color="inherit"><ShoppingCartIcon/></Button>
            <Button color="inherit">Carta</Button>
            {nav_bar==='principal'?<Button color="inherit" onClick={e => setOpenDS(true)}>Login</Button>:<Button color="inherit">Salir</Button>}
          </Toolbar>
        </AppBar>
        <Grid container className={classes.root} style={{ marginBottom: "2%" }}>
          <Grid item xs={12}>
            <img src={cover} height="110%" width="100%" alt="cover" />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <div
              style={{
                textAlign: "justify",
                textJustify: "inter-word",
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "6%",
              }}
            >
              Contamos con personal altamente calificado con varios años de
              experiencia en el sector gastronómico, especialmente el sazón
              peruano. Somos reconocidos por nuestros deliciosos platos picantes
              tradicionales del suroccidente de nuestro país y por nuestra
              especialidad de postres a base de cacao.
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "1%",
              }}
            >
              <Grid container style={{ marginBottom: "2%" }} spacing={2}>
                <Grid item xs={4}>
                  <Card className={classes.rootCard}>
                    <CardHeader
                      title="Alfonso Peralta"
                      subheader="El mago Inca"
                    />
                    <CardMedia
                      className={classes.media}
                      image={chef1}
                      title="Ganador del mejor plato Traditional Food-2019"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Alfonso es catalogado actualmente como uno de los
                        mejores chefs de Perú, su gran habilidad con las
                        especias y la comida de mar le ha dado el título del
                        mago Inca. Una vez hayas probado uno de sus exquisitos
                        platos, vas a querer repetir.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.rootCard}>
                    <CardHeader
                      title="Marcela Curui"
                      subheader="Corazón de Cacao"
                    />
                    <CardMedia
                      className={classes.media}
                      image={chef2}
                      title="Mejor postre de chocolate Peruano - 208"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Marcela Curui es una gran chef cuyos platos se
                        caracteriza por el gra uso del cacao para realizar
                        diferentes receta. Ha logrado un gran renombre no solo
                        en Perú sino también en todo latinoamerica.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.rootCard}>
                    <CardHeader
                      title="Miguel Rodriguez"
                      subheader="El tiki palomón"
                    />
                    <CardMedia
                      className={classes.media}
                      image={chef3}
                      title="Mejor Guiso de Paloma 2020"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Miguel es un experto en cuanto guisos y sopas se trata,
                        no hay nadie que no se pueda resistir a sus deliciosas
                        recetas. Ha sido reconocido por importantes revistas por
                        su gran habilidad en la cocina.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} style={{ backgroundColor: "black" }}>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img
                    src={restaurante}
                    height="100%"
                    width="100%"
                    alt="cover"
                  />
                </Grid>
                <Grid item xs={6}>
                  <p
                    style={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      color: "white",
                      marginRight:'2%'
                    }}
                  >
                      Tenemos alrededor del país diferentes sedes las cuales
                      cumplen con todas las políticas de salubridad y el diseño
                      de interior está pensado para la comodidad de nuestros
                      clientes. Todas nuestras sedes se caracterizan por estar
                      ubicadas en lugares con gran fluidez de tráfico interesa
                      que los clientes puedan llegar con facilidad a nuestras
                      instalaciones. Además de brindar un gran servicio
                      personalizado a cada uno de nuestros clientes.
                  </p>
                  <p
                    style={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      color: "white",
                      marginRight:'2%'
                    }}
                  >
                      Actualmente contamos dos tipos de servicios los cuales son
                      comer en el lugar y para llevar domicilio ambos procesos
                      deben llevarse a cabo por nuestra página web.
                  </p>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <video src={video} width="100%" height="70%" autoPlay={true} muted loop/>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <p>Contacto</p>
                  <a href="" style={{ color: "black" }}>
                    <PhoneIcon /> 323515466
                  </a>
                  <br/>
                  <a href="" style={{ color: "black" }}>
                    <EmailIcon /> alsazonpaloma@gmail.comm
                  </a>
                  <br/>
                  <br/>
                  <a href="" style={{ color: "black" }}>
                    <FacebookIcon />
                  </a>
                  <a href="" style={{ color: "black" }}>
                    <InstagramIcon />
                  </a>
                  <a href="" style={{ color: "black" }}>
                    <TwitterIcon />
                  </a>
                </Grid>
                <Grid item xs={6}>
                <p>Certificación</p>
                <p>ISO 9000/5</p>
                <p>lubricity certificate 3.52</p>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Dialog open={client.status==200?false:openDS} onClose={handleCloseDS} aria-labelledby="form-dialog-title">
              <DialogContent>
                <SignIn/>
              </DialogContent>
        </Dialog>
        <Dialog open={openDU} onClose={handleCloseDU} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title-update">Mis datos</DialogTitle>
        <DialogContent>
          <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Cambiar mis datos</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Button color="inherit" onClick={(e) => setEdit(!edit)}><BorderColorIcon/></Button>
          {client.status==200?<form className={classes.form} noValidate autoComplete="off">
          <TextField label="Doc Num" defaultValue={client.clientInfo.Payload.Id} disabled inputProps={{ 'aria-label': 'description' }}/>
          <TextField label="Tipo de doc" defaultValue={client.clientInfo.Payload.DocType} disabled inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={name} onChange={e => setName(e.target.value)} label="Nombre" disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={lastName} onChange={e => setLastName(e.target.value)} label="Apellido" disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={tel} onChange={e => setTel(e.target.value)} label="Telefono" type='number' disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={mail} onChange={e => setMail(e.target.value)} label="Email" type='email'  disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={sex} onChange={e => setSex(e.target.value)} label="Sexo" disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disabled={edit}
              id="date-picker-birthday-client-update"
              label="Fecha de nacimiento"
              format="yyyy/MM/dd"
              value={date}
              onChange={value => setDate(value)}
              KeyboardButtonProps={{
                "aria-label": "Cambiar fecha",
              }}
            />
          </MuiPickersUtilsProvider>           
          </form>:null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Cambiar mi dirección</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Search_location/>
        </ExpansionPanelDetails>
      </ExpansionPanel> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDU} color="primary">
            Cancelar
          </Button>
          <Button onClick={updateClient} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDC} onClose={e => setOpenDC(false)} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Cambio de contraseña</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Recuerde que la nueva contraseña debe de ser de mas de 6 caracteres.
                </DialogContentText>
                <TextField
                  onChange={(e) => set_contrasenhaOld(e.target.value)}
                  margin="dense"
                  id="old_pass"
                  label="Digite su actual contraseña"
                  type="password"
                  fullWidth
                  value={contrasenhaOld}
                />
                <FormControl className={classes.input}>
                <InputLabel htmlFor="standard-adornment-password">Nueva contraseña</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={contrasenhaNew}
                  onChange={e => set_contrasenhaNew(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={e => set_showPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={e => setOpenDC(false)} color="primary">
                  Cerrar
                </Button>
                <Button onClick={perfomChange} color="primary">
                  Cambiar
                </Button>
              </DialogActions>
            </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={open_success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseSucess} severity="success">
          {message_success}
        </Alert>
      </Snackbar>
      </Box>
  );
};
export default Login_cliente;
