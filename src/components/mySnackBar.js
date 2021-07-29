import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MySnackbar({open, setOpen, message, type}) {

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen({...open, show: false})}>
        <Alert onClose={() => setOpen({...open, show: false})} severity={type}>
            {message}
        </Alert>
    </Snackbar>
  );
}
// severity="success"
// severity="error"
// severity="warning"
// severity="info"