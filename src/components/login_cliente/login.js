import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { success_login_client, error_login_client, set_navbar } from "../../redux/actions";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Formulario_usuario from '../formulario_cliente'
import {Dialog, DialogTitle, DialogActions, DialogContent,Slide, DialogContentText} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'red'
  },
}));


export default function SignIn() {
  const classes = useStyles();
  const [cedula, set_cedula] = React.useState('');
  const [contrasenha, set_contrasenha] = React.useState('');
  const [error_cedula, set_error_cedula] = React.useState(false);
  const [pass_invalid, set_pass_invalid] = React.useState(false);
  const [helper_cedula, set_helper_cc] = React.useState('');
  const [helper_contrasenha, set_helper_pass] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openAut, setOpenAut] = React.useState(false);
  const [error_contrasenha, set_error_contrasenha] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = openAut && options.length === 0;
  const [type_id, set_type_id] = React.useState('');
  const [openSign, setOpenSign] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenSign(false);
  }

  React.useEffect(() => {
    let active = true;

    if (!loading) {
        return undefined;
    }

    fetch('http://localhost:4000/getAllDocuments', {
            method: 'GET'
        }).then(res => res.json())
        .then(items => {
            if(active){
                setOptions(items.map((x) => x.DocumentTypeID));
            }
        })
        .catch(err => console.log(err));
    return () => {
        active = false;
    };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
        setOptions([]);
        }
    }, [open]);  

  
    const ingresar = () => {

        set_error_cedula(false);
        set_error_contrasenha(false);
        set_helper_pass('');
        set_helper_cc('');
        let status;
        fetch('http://localhost:4000/clientLogin', {
          method: 'POST',
          body: JSON.stringify({ ClientID: parseInt(cedula), DocumentTypeID: type_id, ClientPass: contrasenha }) // data can be `string` or {object}!
        }).then(res => { status = res.status; return res.json()})
          .then(response => {
            if(response.error){
              set_pass_invalid(true);
              dispatch(error_login_client(response.error));
            }else{
              dispatch(success_login_client(response, status));
              dispatch(set_navbar('client'));
            }
          })
          .catch(error => alert("Error con la conexión al servidor "+error));
    }

  return (
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio de Sesión
        </Typography>
        <Container className={classes.form}>
        <TextField
              error={error_cedula}
              helperText={helper_cedula}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ccid"
              label="ID"
              name="cedula"
              value={cedula}
              onChange={e => set_cedula(e.target.value)}
              autoFocus
            />
            <Autocomplete
                            id="async-autocompl-client"
                            open={openAut}
                            onOpen={() => {
                              setOpenAut(true);
                            }}
                            onClose={() => {
                              setOpenAut(false);
                            }}
                            getOptionSelected={(option, value) => option === value}
                            getOptionLabel={(option) => option}
                            options={options}
                            loading={loading}
                            onChange={(event, newValue) => {
                              set_type_id(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField 
                                    {...params}
                                    label="Seleccione el documento"
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                    />
            <TextField
              variant="outlined"
              margin="normal"
              error={error_contrasenha}
              helperText={helper_contrasenha}
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              color='primary'
              value={contrasenha}
              onChange={e => set_contrasenha(e.target.value)}
              autoComplete="current-password"
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ingresar}
          >
            Iniciar
          </Button>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Link href="#" style={{color: 'black'}} variant="body2">
                Olvido la contraseña?
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="#" style={{color: 'black'}} variant="body2" onClick={e => setOpenSign(true)}>
                {"Crear cuenta"}
              </Link>
            </Grid>
          </Grid>
        </Container>
        <Snackbar open={pass_invalid} autoHideDuration={4000}
              anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
            >
              <Alert onClose={() => set_pass_invalid(false)} variant="filled" severity="error">
                {"Error en la contraseña o usuario: "}
              </Alert>
        </Snackbar>
        <Dialog
              open={openSign}
              TransitionComponent={Transition}
              fullScreen
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title-client"
              aria-describedby="alert-dialog-slide-description-client"
            >
              <DialogTitle id="alert-dialog-slide-title-client-tit">{"Formulario de registro"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description-client-text">
                  <Formulario_usuario />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose} color="primary">
                  CERRAR FORMULARIO
                </Button>
              </DialogActions>
        </Dialog>
      </div>
  );
}