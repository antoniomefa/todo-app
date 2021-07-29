const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/user_model');
const Joi = require('@hapi/joi');
const route = express.Router();

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(15)
        .required(),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net']} })
});

route.get('/', (req, res) => {
    let resultado = getUser(req.body);
    resultado.then(usuario => {
        res.json(usuario)
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

route.post('/', (req, res) => {
    const {error, value} = schema.validate({name: req.body.name, email: req.body.email});
    if (!error) {
        let resultado = createUser(req.body);
        resultado.then( user => {
            // Si se recibe el Usuario Creado se envia la respuesta
            if (user) {
                res.json({
                    name: user.name,
                    email: user.email,
                    id: user.id
                })
            } else{ // Si no devuelve el Usuario Creado enviamos un status 400 con el error
                res.status(400).json({
                    error: 'Ya existe un usuario con el mismo email'
                })
            }
        }).catch( err => {
            res.status(400).json({
                err
            })
        });
    } else {
        res.status(400).json({
            error
        })
    }
});

async function createUser(body) {
    // Primero valida que el usuario no exista con email
    let email = await Usuario.findOne({email: body.email})
    // En caso de que el email exista retornamos un nulo
    if (email){
        return
    // Caso contrario crea el usuario
    }else {
        let user = new Usuario({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync( body.password, 10 )
        });
        return await user.save();
    }
}; 

async function getUser(body) {
    let usuario = await Usuario.find({"email": body.email})
    .select({name: 1, email: 1});
    return usuario;
};

module.exports = route;