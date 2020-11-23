import React, { useState } from 'react';
import Search_location from '../mapas/search_location';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField, Input } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { IconButton } from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
  } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import {
	set_id,
	set_nombre,
	set_apellido,
	set_celular,
	set_correo,
	set_contrasenha,
	set_date,
	set_type_id,
	set_sex
} from '../../redux/actions';
import { CloudUpload } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
		background: 'green'
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	input: {
		width: '95%',
		margin: '1%'
	},
	table: {
		minWidth: 650,
	},
	container_root: {
		flexGrow: 1,
		marginTop: '3%',
		marginLeft: '1%',
		marginBottom: '3%',
	},
}));

function getSteps() {
	return ['Información básica', 'Dirección', 'Seguridad'];
}
function Informacion_basica() {
	const classes = useStyles();
	const [cedula, set_cc] = useState('');
	const [nombre, set_name] = useState('');
	const [apellido, set_last_name] = useState('');
	const [celular, set_cellphone] = useState('');
	const [correo, set_email] = useState('');
	const [options, setOptions] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
	const [openAut, setOpenAut] = React.useState(false);
	const loading = openAut && options.length === 0;
	const [sex, setSex] = useState(null);
	const { usuario } = useSelector(state => ({
		usuario: state.redux_reducer.usuario,
	}));
	const dispatch = useDispatch();
	const set_state_cedula = (value) => {
		dispatch(set_id(value));
		set_cc(value);
	}
	const set_state_nombre = (value) => {
		dispatch(set_nombre(value));
		set_name(value);
	}
	const set_state_apellido = (value) => {
		dispatch(set_apellido(value));
		set_last_name(value);
	}
	const set_state_celular = (value) => {
		dispatch(set_celular(value));
		set_cellphone(value);
	}
	const set_state_correo = (value) => {
		dispatch(set_correo(value));
		set_email(value);
	}

	const set_state_sex = (value) => {
		setSex(value);
		dispatch(set_sex(value.value));
	}

	const set_state_type_id = (value) => {
		dispatch(set_type_id(value));
		return true;
	}

	const handleDateChange = (date) => {
		setSelectedDate(date);
		dispatch(set_date(date));
	};

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
		if (!openAut) {
		  setOptions([]);
		}
	  }, [openAut]);

	return (
		<div style={{ justifyContent: 'stretch', alignItems: 'center', }}>
				<TextField id="usuario_cedula" type="number" value={cedula} onChange={e => set_state_cedula(e.target.value)} className={classes.input} label="Número de documento" variant="outlined" />
					<Autocomplete
						id="async-autocomplClient"
						open={openAut}
						onOpen={() => {
							setOpenAut(true);
						}}
						onClose={() => {
							setOpenAut(false);
						}}
						getOptionSelected={(option, value) => option === value}
						onChange={(event, newValue) => {
							set_state_type_id(newValue);
						}}
						getOptionLabel={(option) => option}
						options={options}
						loading={loading}
						renderInput={(params) => (
							<TextField 
								{...params}
								className={classes.input}
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
			<TextField id="usuario_nombre" value={nombre} onChange={e => set_state_nombre(e.target.value)} className={classes.input} label="Nombre" variant="outlined" />
			<TextField id="usuario_apellido" value={apellido} onChange={e => set_state_apellido(e.target.value)} className={classes.input} label="Apellido" variant="outlined" />
			<Autocomplete
				id="controlled-combo"
				options={sexOptions}
				getOptionLabel={(option) => option.title}
				value={sex}
				onChange={(event, newValue) => {
					set_state_sex(newValue);
				}}
				renderInput={(params) => <TextField {...params} label="Seleccione su sexo" variant="outlined" className={classes.input}/>}
			/>
			<TextField id="usuario_celular" type="number" value={celular} onChange={e => set_state_celular(e.target.value)} className={classes.input} label="Celular" variant="outlined" />
			<TextField id="usuario_correo" value={correo} onChange={e => set_state_correo(e.target.value)} className={classes.input} label="Correo" variant="outlined" />
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					className={classes.input}
					margin="normal"
					id="date-picker-birthday-client"
					label="Fecha de nacimiento"
					format="MM/dd/yyyy"
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'Cambiar fecha',
					}}
				/>
			</MuiPickersUtilsProvider>
		</div>
	)
}

function Informacion_seguridad() {
	const classes = useStyles();
	const [contrasenha, set_password] = useState('');
	const [showPassword, set_showPassword] = useState(false);


	const { usuario } = useSelector(state => ({
		usuario: state.redux_reducer.usuario,
	}));
	const dispatch = useDispatch();

	const set_state_contrasenha = (value) => {
		dispatch(set_contrasenha(value));
		set_password(value);
	}

	const handleClickShowPassword = () => {
		set_showPassword(!showPassword);
	  };
	
	  const handleMouseDownPassword = (event) => {
		event.preventDefault();
	  };

	return (
		<div style={{ width: '100%' }}>
			<FormControl className={classes.input}>
          <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={contrasenha}
			onChange={e => set_state_contrasenha(e.target.value)}
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
		</div>
	)
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return <Informacion_basica />;
		case 1:
			return <Search_location />;
		case 2:
			return <Informacion_seguridad />;
		default:
			return 'Unknown step';
	}
}

export default function Formulario_usuario() {
	const classes = useStyles();
	const vertical = 'top';
	const horizontal = 'right';
	const [open, setOpen] = React.useState(false);
	const [open_success, set_open_sucess] = React.useState(false);
	const [message, set_message] = React.useState('');
	const [message_success, set_message_success] = React.useState('');
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const steps = getSteps();
	const { usuario, coordenadas, datePick} = useSelector(state => ({
		usuario: state.redux_reducer.usuario,
		coordenadas: state.redux_reducer.coordenadas,
		datePick: state.redux_reducer.datePick
	}));
	const dispatch = useDispatch();
	const handleClose = () => {
		setOpen(false);
	};
	const handleCloseSucess = () => {
		set_open_sucess(false);
	};
	const comprobar_info = () => {
		if (!Number(usuario.id)) {
			set_message('la cédula no puede estar vacia y debe ser un dato tipo numérico');
			setOpen(true);
		}
		else if (usuario.nombre.length === 0) {
			set_message('el nombre no puede estar vacio');
			setOpen(true);
		}
		else if (usuario.apellido.length === 0) {
			set_message('el apellido no puede estar vacio');
			setOpen(true);
		}
		else if (!Number(usuario.celular)) {
			set_message('el celular no puede estar vacio y debe ser un dato tipo numérico');
			setOpen(true);
		}
		else if (!usuario.correo.includes('@')) {
			set_message('el correo no puede estar vacio y debe ser de la forma example@example.com');
			setOpen(true);
		}
		else {
			setOpen(false);
			handleNext()
		}
	}
	const subir_formulario = () => {
		if (!Number(usuario.id) || usuario.nombre.length === 0 || usuario.apellido.length === 0 || !Number(usuario.celular) || !usuario.correo.includes('@') || usuario.contrasenha.length < 7) {

			if (!Number(usuario.id)) {
				set_message('la cédula no puede estar vacia y debe ser un dato tipo numérico');
			}
			if (usuario.nombre.length === 0) {
				set_message('el nombre no puede estar vacio');
			}
			if (usuario.apellido.length === 0) {
				set_message('el apellido no puede estar vacio');
			}
			if (!Number(usuario.celular)) {
				set_message('el celular no puede estar vacio y debe ser un dato tipo numérico');
			}
			if (!usuario.correo.includes('@')) {
				set_message('el correo no puede estar vacio y debe ser de la forma example@example.com');
			}
			if (usuario.contrasenha.length < 7) {
				set_message('la contraseña debe ser mayor a 6 caracteres');
			}
			setOpen(true);
		}
		else {
			setOpen(false);
			fetch('http://localhost:4000/createClient', {
				method: 'POST',
				body: JSON.stringify({
					ClientID: parseInt(usuario.id),
					ClientName: usuario.nombre,
					ClientLastName: usuario.apellido,
					ClientPhone: usuario.celular,
					ClientBirthDate: datePick,
					ClientEmail: usuario.correo,
					ClientLatitude: coordenadas.lat,
					ClientLongitude: coordenadas.lng,
					ClientPass: usuario.contrasenha,
					DocumentTypeID: usuario.tipoId,
					ClientSex: usuario.sex
				}) // data can be `string` or {object}!
			}).then(res => res.json())
				.then(response => {
					if (response.error) {
						set_message(response.error);
						setOpen(true);
					}
					else {
						set_message_success(response.Message);
						set_open_sucess(true);
						handleReset();
						dispatch(set_id(''));
						dispatch(set_nombre(''));
						dispatch(set_apellido(''));
						dispatch(set_celular(''));
						dispatch(set_correo(''));
						dispatch(set_contrasenha(''));
					}
				})
				.catch(error => {
					alert(error);
				});
		}
	}
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
							<StepLabel  {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}
				anchorOrigin={{ vertical, horizontal }}>
				<Alert onClose={handleClose} severity="error">
					{message}
				</Alert>
			</Snackbar>
			<Snackbar open={open_success} autoHideDuration={3000} onClose={handleClose}
				anchorOrigin={{ vertical, horizontal }}>
				<Alert onClose={handleCloseSucess} severity="success">
					{message_success}
				</Alert>
			</Snackbar>
			<div style={{ bottom: '0', width: '100%' }}>
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
							<div className={classes.instructions}>{getStepContent(activeStep)}</div>
							<div style={{ textAlign: 'center', marginTop: '8%' }}>
								<Button style={{ color: 'gray' }} disabled={activeStep === 0} onClick={handleBack} variant="outlined" >
									Regresar
								</Button>
								{activeStep === steps.length - 1 ?
									<Button
										variant="contained"
										color="primary"
										onClick={e => subir_formulario()}
										style={{ marginLeft: '5%', color: 'white', background: 'green' }}>Finalizar
									</Button> :
									<Button
										variant="contained"
										onClick={e => comprobar_info()}
										style={{ marginLeft: '5%', color: 'white', background: 'green' }}>Siguiente
									</Button>}

							</div>
						</div>
					)}
			</div>
		</div>
	);
}

const sexOptions = [{title: "Masculino", value: true},{title: "Feminino", value: false}];