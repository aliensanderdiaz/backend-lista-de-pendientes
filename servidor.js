const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(
    'mongodb://localhost:27017/lista-angular', {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const Lista = mongoose.model('Lista', {
    texto: String,
    terminado: Boolean
});

app.use(express.json());

app.use(cors());

app.post('/api/lista', function(req, res) {
    Lista.create({
        texto: req.body.texto,
        terminado: false
    }, (err, lista) => {
        if (err) {
            return res.send(err);
        }

        Lista.find((err, lista) => {
            if (err) {
                return res.send(err);
            }

            return res.json(lista)
        })
    })
})

app.get('/api/lista', function(req, res) {

    Lista.find((err, lista) => {
        if (err) {
            return res.send(err);
        }

        return res.json(lista)
    })

})

app.delete('/api/lista/:item', function(req, res) {

    Lista.deleteOne({ _id: req.params.item }, (err, lista) => {
        if (err) {
            return res.send(err);
        }

        Lista.find((err, lista) => {
            if (err) {
                return res.send(err);
            }

            return res.json(lista)
        })
    })

})

app.put('/api/lista/:item', function(req, res) {

    const body = req.body;

    Lista.findOneAndUpdate({ _id: req.params.item }, body,
        (err, lista) => {
            if (err) {
                return res.send(err);
            }

            Lista.find((err, lista) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(lista)
            })
        })

})

app.listen(8080, () => console.log('Servidor'))