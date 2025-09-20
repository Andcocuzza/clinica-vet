//Routes/historicoRoutes.js
const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');

// Defina suas rotas aqui
router.get('/', historicoController.getAllHistoricos); // Listar todos os históricos
router.get('/:id', historicoController.getHistoricoById); // Buscar histórico pelo ID
router.post('/', historicoController.createHistorico); // Criar um novo histórico
router.put('/:id', historicoController.updateHistorico); // Atualizar histórico pelo ID
router.delete('/:id', historicoController.deleteHistorico); // Deletar histórico pelo ID

module.exports = router;
