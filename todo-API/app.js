const express = require('express');
const mongoose = require('mongoose');
const usuarios = require('./routes/users');
const tareas = require('./routes/tasks');
const auth = require('./routes/auth');

// Conexión a la BD
mongoose.connect('mongodb://localhost:27017/ToDo_Bd', 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB...'))
.catch(err => console.log('No se pudo conectar a MongoDB...'));

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/usuarios', usuarios);
app.use('/tareas', tareas);
app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`API ejecutandose en el puerto ${port}`);
});