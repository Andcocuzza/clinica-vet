const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const tutorRoutes = require('./routes/tutorRoutes');
const animalRoutes = require('./routes/animalRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const historicoRoutes = require('./routes/historicoRoutes');
const atendimentosRoutes = require('./routes/atendimentosRoutes');

console.log("AtendimentosRoutes carregadas:", atendimentosRoutes);


app.use('/tutores', tutorRoutes);
app.use('/animais', animalRoutes);
app.use('/servicos', servicoRoutes);
app.use('/historicos', historicoRoutes);
app.use('/atendimentos', atendimentosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


