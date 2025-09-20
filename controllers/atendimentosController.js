// controllers/atendimentosController.js
const { createHistoricoAutomatico } = require('./historicoController');
const db = require('../db');

// Listar todos os atendimentos
exports.getAllAtendimentos = (req, res) => {
  const sql = "SELECT * FROM atendimentos";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar atendimento por ID
exports.getAtendimentosById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM atendimentos WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Atendimento não encontrado" });
    res.json(results[0]);
  });
};

// Criar novo atendimento
exports.createAtendimentos = (req, res) => {
  const { animal_id, data_atendimento, tipo, descricao } = req.body; // Campos do banco
  const sql = "INSERT INTO atendimentos (animal_id, data_atendimento, tipo, descricao) VALUES (?, ?, ?, ?)";

  db.query(sql, [animal_id, data_atendimento, tipo, descricao], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Registrar automaticamente no histórico
    createHistoricoAutomatico(animal_id, data_atendimento, tipo, descricao);

    res.status(201).json({
      id: result.insertId,
      animal_id,
      data_atendimento,
      tipo,
      descricao
    });
  });
};

// Atualizar atendimento
exports.updateAtendimentos = (req, res) => {
  const { id } = req.params;
  const { animal_id, data_atendimento, tipo, descricao } = req.body;
  const sql = "UPDATE atendimentos SET animal_id=?, data_atendimento=?, tipo=?, descricao=? WHERE id=?";

  db.query(sql, [animal_id, data_atendimento, tipo, descricao, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Atendimento atualizado com sucesso" });
  });
};

// Deletar atendimento
exports.deleteAtendimentos = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM atendimentos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Atendimento removido com sucesso" });
  });
};
