import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import NewTask from '../components/newTask';
import CompleteTask from '../components/completeTask';
import MySnackbar from "../components/mySnackBar";
import AuthContext from '../services/auth';
import Service from '../services/service';
import { transformDateString } from '../services/validations';

const useStyles = makeStyles(theme => ({
  closeButton: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2)
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

const MyTasks = ({ history }) => {
  const classes = useStyles();
  const { currentUser, setCurrentUser, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [tasksList, setTasksList] = useState([]);
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);
  const [openCompleteTaskDialog, setOpenCompleteTaskDialog] = useState(false);
  const [taskSelected, setTaskSelected] = useState(null);
  const [taskIdSelected, setTaskIdSelected] = useState(null);
  const [message, setMessage] = useState({
    msj: '',
    type: '',
    show: false
  });

  useEffect(() => {
    (async () => {
      if (currentUser && isSignedIn) {
        const payload = {
          user: currentUser.id
        };  
        const response = await Service('POST', 'tareas/list', null, payload);
        if (response.status) {
          setTasksList(response.body);
        } else {
          setMessage({
            msj: response.body.error,
            type: 'error',
            show: true
          });
        }
      } else {
        history.push("/login");
      }
    })()
  }, [currentUser, isSignedIn, openNewTaskDialog, openCompleteTaskDialog])

  const handleCompleteTask = (task, taskId) => {
    setTaskSelected(task);
    setTaskIdSelected(taskId);
    setOpenCompleteTaskDialog(true);
  };

  return(
    <>
      <Grid container direction="row" justify="flex-start" className={classes.closeButton}>
        <Fab 
          size="small"
          color="white"
          aria-label="salir"
          onClick={() => {setIsSignedIn(false); setCurrentUser(null) }}>
          <Link to="/login">
            <CloseIcon fontSize="medium" style={{ justifyContent: 'flex-end' }}/>
          </Link>
        </Fab>
      </Grid>

      <Grid container direction="column" justify="center" alignItems="center">
        <Grid>
          <Typography variant="h3" className="Titulo">
            Lista de tareas
          </Typography>
        </Grid>
        <Grid item>
          <Paper elevation={20} className={classes.paper}>
            <Grid container direction="row" justify="flex-end">
              
            </Grid>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">TAREA</TableCell>
                  <TableCell align="left">FECHA VENCIMIENTO</TableCell>
                  <TableCell align="left">COMPLETADA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { tasksList && tasksList.map(row => (
                  <TableRow key={row._id}>
                    <TableCell align="left">{row.task}</TableCell>
                    <TableCell align="center">{transformDateString(row.due)}</TableCell>
                    <TableCell align="center">{row.completed ? 'Sí' : 'No'}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="complete" onClick={() => handleCompleteTask(row.task, row._id)}>
                        <AssignmentTurnedInIcon 
                          fontSize="small" 
                          style={{ color: row.completed  && '#ff00fe' }}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item className={classes.marginDistance}>
          <Button
            className={classes.gradientButton}
            onClick={() => setOpenNewTaskDialog(true)}
          >
            Nueva tarea
          </Button>
        </Grid>
      </Grid>
      
      {
        openNewTaskDialog &&
          <NewTask isOpen={openNewTaskDialog} setIsOpen={setOpenNewTaskDialog} user={currentUser.id} />
      }
      {
        openCompleteTaskDialog &&
          <CompleteTask 
            isOpen={openCompleteTaskDialog}
            setIsOpen={setOpenCompleteTaskDialog}
            task={taskSelected}
            taskId={taskIdSelected}
          />
      }
      <MySnackbar open={message.show} setOpen={setMessage} message={message.msj} type={message.type}/>
    </>
  );
}

export default withRouter(MyTasks);
