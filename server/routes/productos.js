const express = require('express');
const _ = require('underscore');
const productos = require('../models/productos');
const app = express();


app.get('/productos', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    productos.find({})
    .skip(Number(desde))
    .limit(Number(hasta))  
    .populate('usuario', 'nombre email')
    .exec((err, productos) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar los productos',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Productos listados con exito',
            conteo: productos.length,
            productos
        })
    })

});
app.post('/productos', (req, res) => {
    let cat = new productos({
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria,
        disponible: req.body.disponible,
        usuario: req.body.usuario
        
    });
    
    cat.save((err, catDB) => {
        if(err){ 
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un producto',
                err 
            })
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            catDB
        })
    })
});

app.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', 'precio', 'categoria', 'disponible', 'usuario']);

    Productos.findByIdAndUpdate(id, body, {new:true, runValidators:true, context:'query'}, (err, catDB) => {
       if (err){
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al momento de actualizar',
               err
           })
       } 

       res.json({
           ok: true,
           msg: 'Los productos fueron actualizados con exito',
           catDB
       })
    })
});

app.delete('/productos/:id', (req, res) => {
    let id = req.params.id

    Productos.findByIdAndRemove(id, { context: 'query'}, (err, catDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Los productos fueron eliminados con exito',
            catDB

        })
    })
});

module.exports = app;