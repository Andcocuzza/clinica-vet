const db = require('../db');

// Listar todos os históricos com nome do animal e tutor
exports.getAllHistoricos = (req, res) => {
  const sql = `
    SELECT h.id, h.data, h.tipo, a.nome AS animal, t.nome AS tutor
    FROM historico h
    LEFT JOIN animais a ON h.animal_id = a.id
    LEFT JOIN tutores t ON a.tutor_id = t.id
    ORDER BY h.data DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar histórico por ID
exports.getHistoricoById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT h.id, h.data, h.tipo, a.nome AS animal, t.nome AS tutor
    FROM historico h
    LEFT JOIN animais a ON h.animal_id = a.id
    LEFT JOIN tutores t ON a.tutor_id = t.id
    WHERE h.id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Histórico não encontrado' });
    res.json(results[0]);
  });
};

// Criar histórico manualmente (se precisar)
exports.createHistorico = (req, res) => {
  const { animal_id, servico, data, tipo } = req.body;
  const sql = 'INSERT INTO historico (animal_id, servico, data, tipo) VALUES (?, ?, ?, ?)';
  db.query(sql, [animal_id, servico, data, tipo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Histórico criado', id: result.insertId });
  });
};

// Registrar histórico automaticamente (usado pelo atendimento)
exports.createHistoricoAutomatico = (animal_id, servico, data, tipo) => {
  const sql = 'INSERT INTO historico (animal_id, servico, data, tipo) VALUES (?, ?, ?, ?)';
  db.query(sql, [animal_id, servico, data, tipo], (err) => {
    if (err) console.error('Erro ao registrar histórico:', err.message);
  });
};

// Atualizar histórico
exports.updateHistorico = (req, res) => {
  const { id } = req.params;
  const { animal_id, servico, data } = req.body;
  db.query(
    'UPDATE historico SET animal_id = ?, servico = ?, data = ? WHERE id = ?',
    [animal_id, servico, data, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Histórico atualizado' });
    }
  );
};

// Deletar histórico
exports.deleteHistorico = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM historico WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Histórico deletado' });
  });
};
