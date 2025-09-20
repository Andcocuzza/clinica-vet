// controllers/atendimentoController.js
const { createHistoricoAutomatico } = require('./historicoController');

const db = require('../db'); 

// Listar todos os atendimentos
exports.getAllAtendimentos = (req, res) => {
  const sql = "SELECT * FROM atendimentos";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Buscar atendimento por ID
exports.getAtendimentosById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM atendimentos WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Atendimento não encontrado" });
    res.json(results[0]);
  });
};

// Criar novo atendimento
exports.createAtendimentos = (req, res) => {
  const { animal_id, servico, data, tipo } = req.body; // tipo: 'Consulta', 'Vacina', 'Exame'
  const sql = "INSERT INTO atendimentos (animal_id, servico, data, tipo) VALUES (?, ?, ?, ?)";
  db.query(sql, [animal_id, servico, data, tipo], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Registrar automaticamente no histórico
    createHistoricoAutomatico(animal_id, servico, data, tipo);
    res.status(201).json({ 
      id: result.insertId, 
      animal_id, 
      servico, 
      data, 
      tipo 
    });
  });
};

// Atualizar atendimento
exports.updateAtendimentos = (req, res) => {
  const { id } = req.params;
  const { animal_id, servico, data, tipo } = req.body;

  const sql = "UPDATE atendimentos SET animal_id=?, servico=?, data=?, tipo=? WHERE id=?";
  db.query(sql, [animal_id, servico, data, tipo, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Atendimento atualizado com sucesso" });
  });
};

// Deletar atendimento
exports.deleteAtendimentos = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM atendimentos WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Atendimento removido com sucesso" });
  });
};
