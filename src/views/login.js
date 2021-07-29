import React, { useCallback, useState, useContext } from "react";
import { withRouter } from "react-router";
import MySnackbar from "../components/mySnackBar";
import Service from "../services/service";
import { validateEmail } from '../services/validations';
import AuthContext from "../services/auth";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(10),
    borderRadius: 8
  },
  marginDistance: {
    marginBottom: theme.spacing(3)
  },
  gradientButton: {
    background: "linear-gradient(90deg, #00fff4 0%, #ff00fe 100%)",
    borderRadius: 25,
    color: "white",
    fontWeight: "bold",
    height: 48,
    width: 300,
    marginTop: 20,
    "&:hover": {
      background: "linear-gradient(90deg, #00fff4 10%, #ff00fe 120%)",
      boxShadow: "0 5px 5px 2px rgba(200, 105, 135, .4)"
    }
  }
}));

const LinkButton = withStyles(() => ({
  root: {
    textTransform: "none"
  }
}))(Button);

const Login = ({ history }) => {
  const loggedUser = useContext(AuthContext);
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    error: false,
    newAccount: false
  });
  const [message, setMessage] = useState({
    msj: '',
    type: '',
    show: false
  });
  
  const onLogin = useCallback(
    async (email, password) => {
      try {
        const payload = {
          email, password
        };
        const response = await Service('POST', 'auth', null, payload);
        if (response.status) {
          loggedUser.setIsSignedIn(true);
          loggedUser.setCurrentUser(response.body);
          history.push("/mytasks");
        } else {
          setMessage({
            msj: response.body.msj,
            type: 'warning',
            show: true
          });
        }
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const onCreateNewAccount = async (name, email, password, confirmPassword) => {
    if (!name || !email || !password || !confirmPassword) {
      setMessage({
        msj: "Todos los campos son requeridos",
        type: 'warning',
        show: true
      });
    } else if (!validateEmail(email)) {
      setMessage({
        msj: "Formato de correo electrónico incorrecto",
        type: 'warning',
        show: true
      });
    } else if (password !== confirmPassword) {
      setMessage({
        msj: "Las contraseñas no coinciden",
        type: 'warning',
        show: true
      });
    } else {
      try {
        const payload = {
          name, email, password
        };
        const response = await Service('POST', 'usuarios', null, payload);
        if (response.status) {
          loggedUser.setIsSignedIn(true);
          loggedUser.setCurrentUser(response.body);
          history.push("/mytasks");
        } else {
          setMessage({
            msj: response.body.error,
            type: 'error',
            show: true
          });
        }
      } catch (error) {
        setMessage({
          msj: error,
          type: 'error',
          show: true
        });
      }
    }
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleShowOptions = prop => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Paper className={classes.paper} elevation={20}>
        {values.newAccount ? (
          <>
            <Typography align="center" variant={"h4"} className={classes.marginDistance}>
              Nueva Cuenta
            </Typography>
          </>
        ) : (
          <Typography align="center" paragraph variant={"h4"} className={classes.marginDistance}>
            Inicia sesión
          </Typography>
        )}

        {values.newAccount && (
          <Grid item xs={12} sm={12} className={classes.marginDistance}>
          <FormControl fullWidth error={values.error}>
            <Typography align="left">Nombre de usuario</Typography>
            <Input
              id="name"
              type="text"
              value={values.name}
              placeholder={"Escribe tu nombre"}
              onChange={handleChange("name")}
              startAdornment={
                <InputAdornment>
                  <IconButton aria-label="lock">
                    <AccountCircleOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        )}

        <Grid item xs={12} sm={12} className={classes.marginDistance}>
          <FormControl fullWidth error={values.error}>
            <Typography align="left">Email</Typography>
            <Input
              id="email"
              type="text"
              value={values.email}
              placeholder={"Escribe tu correo electrónico"}
              onChange={handleChange("email")}
              startAdornment={
                <InputAdornment>
                  <IconButton aria-label="lock">
                    <AccountCircleOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={12} className={classes.marginDistance}>
          <FormControl fullWidth error={values.error}>
            <Typography align="left">Contraseña</Typography>
            <Input
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              placeholder="Escribe tu contraseña"
              onChange={handleChange("password")}
              startAdornment={
                <InputAdornment>
                  <IconButton aria-label="lock">
                    <LockOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowOptions("showPassword")}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        {values.newAccount && (
          <Grid item xs={12} lg={12} className={classes.marginDistance}>
            <FormControl fullWidth error={values.error}>
              <Typography align="left">Confirmar contraseña</Typography>
              <Input
                id="confirmPassword"
                type={values.showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                placeholder="Escribela nuevamente"
                onChange={handleChange("confirmPassword")}
                startAdornment={
                  <InputAdornment>
                    <IconButton aria-label="lock">
                      <LockOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowOptions("showConfirmPassword")}
                    >
                      {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        )}

        <Grid item className={classes.marginDistance}>
          <Button
            className={classes.gradientButton}
            onClick={
              !values.newAccount
                ? () => onLogin(values.email, values.password)
                : () => onCreateNewAccount(values.name, values.email, values.password, values.confirmPassword)
            }
          >
            {values.newAccount ? "Crear" : "Entrar"}
          </Button>
        </Grid>

        <Grid container justify="flex-end">
          <LinkButton
            color="primary"
            className={classes.forgot}
            onClick={handleShowOptions("newAccount")}
          >
            {values.newAccount ? "Regresar a Login" : "Crear nueva cuenta"}
          </LinkButton>
        </Grid>
      </Paper>
      <MySnackbar open={message.show} setOpen={setMessage} message={message.msj} type={message.type}/>
    </Grid>
  );
};

export default withRouter(Login);
