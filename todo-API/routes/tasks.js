const express = require('express');
const Tarea = require('../models/task_model');
const Joi = require('@hapi/joi');
const route = express.Router();

// Esquema Joi para validación de la tarea 
const schema = Joi.object({
    task: Joi.string()
        .min(3)
        .max(50)
        .required(),

    due: Joi.date()
        .iso(),

    user: Joi.string()
        .min(3)
        .max(50)
        .required()
});

route.post('/list', (req, res) => {
    let resultado = getTasks(req.body);
    resultado.then(tareas => {
        res.json(tareas)
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

route.post('/', (req, res) => {
    const {error, value} = schema.validate({
        task: req.body.task,
        due: req.body.due,
        user: req.body.user
    });
    if (!error) {
        let resultado = createTask(req.body);
        resultado.then( task => {
            res.json({
                task
            })
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

route.put('/:id', (req, res) => {
    let resultado = updateTask(req.params.id);
    resultado.then( task => {
        res.json({
            task
        })
    }).catch( err => {
        res.status(400).json({
            err
        })
    });
});

async function getTasks(body) {
    let tareas = await Tarea.find({"user": body.user })
    .select({id: 1, task: 1, due: 1, completed: 1});
    return tareas;
};

async function createTask(body) {
    let task = new Tarea({
        task: body.task,
        due: body.due,
        user: body.user
    });
    return await task.save();
}; 

async function updateTask(id) {
    let tarea = await Tarea.findByIdAndUpdate(id, {
        $set: {
            completed: true
        }
    }, {new: true});
    return tarea;
};

module.exports = route;