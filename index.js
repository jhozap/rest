const express = require('express');
const { Usuarios } = require('./data/usuarios');
const { dbConnection } = require('./database/config');
const Usuario = require('./models/Usuario');

const app = express();

dbConnection();

app.use(express.json());

app.get('/api/usuarios', async (req, res) => {


    try {

        const lstUsuarios = await Usuario.find();

        res.json({
            ok: true,
            msg: 'listar todos los usuarios',
            value: lstUsuarios
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'error al cosnultar los usuarios'
        });
    }


});

app.get('/api/usuarios/:id', async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.params.id);

        res.json({
            ok: true,
            msg: 'listar todos los usuarios',
            value: ususario
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'error al consultar el usuario'
        });
    }
});

app.post('/api/usuarios/', async (req, res) => {

    const usuario = new Usuario(req.body);

    try {
        const nuevoUsuario = await usuario.save();
        res.status(201).json({
            ok: true,
            msg: 'crear usuario',
            value: nuevoUsuario
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'error al crear usuario'
        });
    }

    
});

app.put('/api/usuarios/:id', (req, res) => {

    Usuarios.map( u => {
        if(u._id === parseInt(req.params.id)) {
            u.nombre = req.body.nombre;
            u.apellido = req.body.apellido;
            u.edad = req.body.edad;
        }
    });

    res.json({
        ok: true,
        msg: 'actualizar usuario',
        value: Usuarios
    });
});

app.delete('/api/usuarios/:id', (req, res) => {

    let lstUsuarios = Usuarios.filter(u => u._id === parseInt(req.params.id));

    res.json({
        ok: true,
        msg: 'eliminar usuario',
        value: lstUsuarios
    });
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT || 4000 }`)
});
