const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-pfahd.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// app.use(cors({ origin: 'http://localhost:7777' }));
app.use(cors());
app.use(express.json());

// Métodos HTTP: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

// Tipos de paramêtros

// Query params: req.query -> utilizado quando se deseja realizar alguma busca, filtrar, ordenar ou em paginação.
// Route params: req.params -> utilizado quando se deseja identificar um recurso na alteração ou remoção.
// Body: req.body -> Dados para criação ou alteração de um registro.

app.use(routes);

app.listen(7777);