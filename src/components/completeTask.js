import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Service from "../services/service";

export default function CompleteTask({ isOpen, setIsOpen, task, taskId }) {

    const handleCompleteTask = async() => {
        const path = 'tareas/' + taskId;
        const response = await Service('PUT', path);
        if (response.status) {
            setIsOpen(false);
        } else {
            alert(response.body.error);
        }
    };
    
    return (
        <Dialog
        open={isOpen}
        onClose={()=> setIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{task}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            ¿Estas seguro que deseas marcar la tarea como completada?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=> setIsOpen(false)} color="primary" autoFocus>
                Cancelar
            </Button>
            <Button onClick={()=> handleCompleteTask()} color="primary" >
                Confirmar
            </Button>
        </DialogActions>
        </Dialog>
    );
}