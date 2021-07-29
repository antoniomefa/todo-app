const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/user_model');
const route = express.Router();

route.post('/', (req, res) => {
    Usuario.findOne({email: req.body.email})
    .then(datos => {
        if (datos) {
            const isValidPass = bcrypt.compareSync(req.body.password, datos.password);
            if (!isValidPass) {
                return res.status(400).json({
                    error: 'ok',
                    msj: 'Usuario o contraseña incorrectos'
                });
            }
            res.json({
                name: datos.name,
                email: datos.email,
                id: datos.id
            });
        } else {
            res.status(400).json({
                error: 'ok',
                msj: 'Usuario o contraseña incorrectos'
            });
        }
    })
    .catch(err => {
        res.status(400).json({
            error: 'ok',
            msj: 'Error en el servicio' + err
        });
    })
});

module.exports = route;