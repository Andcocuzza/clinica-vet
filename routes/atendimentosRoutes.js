// routes/atendimentos.js
const express = require('express');
const router = express.Router();
const atendimentosController = require('../controllers/atendimentosController');

// Rotas para atendimentos
router.get('/', atendimentosController.getAllAtendimentos); // Listar todos os atendimentos
router.get('/:id', atendimentosController.getAtendimentosById); // Buscar atendimento pelo ID
router.post('/', atendimentosController.createAtendimentos); // Criar um novo atendimento
router.put('/:id', atendimentosController.updateAtendimentos); // Atualizar atendimento pelo ID
router.delete('/:id', atendimentosController.deleteAtendimentos); // Deletar atendimento pelo ID

module.exports = router;