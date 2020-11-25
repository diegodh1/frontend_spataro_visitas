import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField, Input } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { useSelector, useDispatch } from "react-redux";
import {
  set_id,
  set_nombre,
  set_apellido,
  set_contrasenha,
  set_repeat_pass
} from "../../redux/actions";
import { CloudUpload } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
    background: "green",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  input: {
    width: "95%",
    margin: "1%",
  },
  table: {
    minWidth: 650,
  },
  container_root: {
    flexGrow: 1,
    marginTop: "3%",
    marginLeft: "1%",
    marginBottom: "3%",
  },
}));

function getSteps() {
  return ["Información básica", "Seguridad"];
}
function Informacion_basica() {
  const classes = useStyles();
  const [id, set_cc] = useState("");
  const [nombre, set_name] = useState("");
  const [apellido, set_last_name] = useState("");
  const dispatch = useDispatch();

  const set_state_id = (value) => {
    dispatch(set_id(value));
    set_cc(value);
  };
  const set_state_nombre = (value) => {
    dispatch(set_nombre(value));
    set_name(value);
  };
  const set_state_apellido = (value) => {
    dispatch(set_apellido(value));
    set_last_name(value);
  };

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <TextField
        id="usuario_id"
        type="number"
        value={id}
        onChange={(e) => set_state_id(e.target.value)}
        className={classes.input}
        label="Número documento"
        variant="outlined"
      />
      <TextField
        id="usuario_nombre"
        value={nombre}
        onChange={(e) => set_state_nombre(e.target.value)}
        className={classes.input}
        label="Nombre"
        variant="outlined"
      />
      <TextField
        id="usuario_apellido"
        value={apellido}
        onChange={(e) => set_state_apellido(e.target.value)}
        className={classes.input}
        label="Apellido"
        variant="outlined"
      />
    </div>
  );
}

function Informacion_seguridad() {
  const classes = useStyles();
  const [contrasenhaNew, set_contrasenhaNew] = useState("");
  const [contrasenhaRepeat, set_contrasenhaRepeat] = useState("");
  const [equalContrasenha, set_equalContrasenha] = useState(true);
  const [showPassword, set_showPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open_success, set_open_success] = React.useState(false);
  const vertical = "top";
  const horizontal = "right";

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    set_open_success(false);
  };
  const set_state_contrasenhaNew = (value) => {
    dispatch(set_contrasenha(value));
    set_contrasenhaNew(value);
    set_equalContrasenha(true);
  };
  const set_state_contrasenhaRepeat = (value) => {
    if (value != contrasenhaNew) {
      set_equalContrasenha(true);
      dispatch(set_repeat_pass(true));
    } else {
      set_equalContrasenha(false);
      dispatch(set_repeat_pass(false));
    }
    set_contrasenhaRepeat(value);
  };

  const handleClickShowPassword = () => {
    set_showPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ alignContent: "center" }}>
      <FormControl className={classes.input}>
        <InputLabel htmlFor="standard-adornment-password">
          Contraseña
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          value={contrasenhaNew}
          onChange={(e) => set_state_contrasenhaNew(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={classes.input}>
        <InputLabel htmlFor="standard-adornment-password">
          Repetir contraseña
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type="password"
          value={contrasenhaRepeat}
          onChange={(e) => set_state_contrasenhaRepeat(e.target.value)}
          error={equalContrasenha}
        />
      </FormControl>
    </div>
  );
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Informacion_basica />;
    case 1:
      return <Informacion_seguridad />;
    default:
      return "Unknown step";
  }
}

export default function Formulario_empleado() {		
  const classes = useStyles();
  const vertical = "top";
  const horizontal = "right";
  const [open, setOpen] = React.useState(false);
  const [open_success, set_open_sucess] = React.useState(false);
  const [message, set_message] = React.useState("");
  const [message_success, set_message_success] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const { usuario } = useSelector((state) => ({
    usuario: state.redux_reducer.usuario,
    coordenadas: state.redux_reducer.coordenadas,
    subio_fot: state.redux_reducer.subio_fot,
    datePick: state.redux_reducer.datePick,
    tipoId: state.redux_reducer.tipoId,
  }));
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSucess = () => {
    set_open_sucess(false);
  };
  const comprobar_info = () => {
    if (usuario.id && usuario.nombre) {
      if (!Number(usuario.id)) {
        set_message(
          "la cédula no puede estar vacia y debe ser un dato tipo numérico"
        );
        setOpen(true);
      } else if (usuario.nombre.length === 0) {
        set_message("el nombre no puede estar vacio");
        setOpen(true);
      } else {
        setOpen(false);
        handleNext();
      }
    } else {
      set_message("El id de usuario y nombre son obligatorios");
      setOpen(true);
    }
  };
  const subir_formulario = () => {
    if (usuario.id && usuario.nombre && usuario.contrasenha) {
      if (
        !Number(usuario.id) ||
        usuario.nombre.length === 0 ||
		usuario.contrasenha.length < 1
		|| !usuario.equalContrasenha
      ) {
        if (!Number(usuario.id)) {
          set_message(
            "la cédula no puede estar vacia y debe ser un dato tipo numérico"
          );
        }
        if (usuario.nombre.length === 0) {
          set_message("el nombre no puede estar vacio");
        }
        if (usuario.contrasenha.length < 1) {
          set_message("la contraseña debe ser mayor a 6 caracteres");
		}
		if (!usuario.equalContrasenha) {
		  set_message("Asegurese de repetir la contraseña");	
		}
        setOpen(true);
      } else {
        let status;
        setOpen(false);
        fetch("http://localhost:4000/createUser", {
          method: "POST",
          body: JSON.stringify({
            UsuarioID: parseInt(usuario.id),
            UsuarioNombre: usuario.nombre,
            UsuarioApellido: usuario.apellido?usuario.apellido:"",
            UsuarioContrasena: usuario.contrasenha,
          }),
        })
          .then((res) => {
            status = res.status;
            return res.json();
          })
          .then((response) => {
            if (status != 200) {
              set_message(response.Message);
              setOpen(true);
            } else {
              set_message_success("Se ha creado con exito el usuario");
              set_open_sucess(true);
              handleReset();
              dispatch(set_id(""));
              dispatch(set_nombre(""));
              dispatch(set_apellido(""));
              dispatch(set_contrasenha(""));
            }
          })
          .catch((error) => {
            alert("Error con la conexión al servidor: " + error);
          });
      }
    } else {
		set_message("El id de usuario,nombre y contraseña son obligatorios");
		setOpen(true);
    }
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
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
      <div style={{ bottom: "0", width: "100%" }}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              handleReset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            <div style={{ textAlign: "center", marginTop: "8%" }}>
              <Button
                style={{ color: "gray" }}
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Regresar
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => subir_formulario()}
                  style={{
                    marginLeft: "5%",
                    color: "white",
                    background: "green",
                  }}
                >
                  Finalizar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={(e) => comprobar_info()}
                  style={{
                    marginLeft: "5%",
                    color: "white",
                    background: "green",
                  }}
                >
                  Siguiente
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
