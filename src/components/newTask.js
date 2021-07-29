import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Service from "../services/service";

export default function NewTask ({ isOpen, setIsOpen, user }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [taskName, setTaskName] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCreate = async() => {
        if (!taskName || ! selectedDate || !user) {
            alert('Todos los campos son requeridos');
        } else {
            const payload = {
                task: taskName,
                due: selectedDate,
                user
            };
            const response = await Service('POST', 'tareas', null, payload);
            if (response.status) {
                setIsOpen(false);
            } else {
              alert(response.body.error);
            }
        }
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog open={isOpen} onClose={()=> setIsOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Nueva tarea</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Ingresa los datos de la nueva tarea
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Tarea"
                    type="task"
                    fullWidth
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <Grid container direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={6}>
                        Fecha de vencimiento
                    </Grid>
                    <Grid item xs={6}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'Fecha de vencimiento',
                            }}
                        />
                    </Grid>
                </Grid>
                
            </DialogContent>

            <DialogActions>
                <Button onClick={()=> setIsOpen(false)} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={()=> handleCreate()} color="primary">
                    Crear
                </Button>
            </DialogActions>

        </Dialog>
      </MuiPickersUtilsProvider>
    );
};