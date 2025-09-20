const db = require('../db');

// Função para listar todos os animais com nome do tutor
exports.getAllAnimals = (req, res) => {
  const query = `
    SELECT a.*, t.nome AS tutor_nome 
    FROM animais a
    LEFT JOIN tutores t ON a.tutor_id = t.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar animal pelo ID com tutor
exports.getAnimalById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT a.id, a.nome, a.especie, a.raca, a.idade,
           t.nome AS tutor_nome
    FROM animais a
    INNER JOIN tutores t ON a.tutor_id = t.id
    WHERE a.id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Animal não encontrado' });
    res.json(results[0]);
  });
};

// Criar novo animal
exports.createAnimal = (req, res) => {
  const { nome, especie, raca, idade, tutor_id } = req.body;
  db.query(
    'INSERT INTO animais (nome, especie, raca, idade, tutor_id) VALUES (?, ?, ?, ?, ?)',
    [nome, especie, raca, idade, tutor_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Animal criado', id: results.insertId });
    }
  );
};


// Atualizar animal
exports.updateAnimal = (req, res) => {
  const { id } = req.params;
  const { nome, especie, idade, raca, tutor_id } = req.body;
 db.query(
    'UPDATE animais SET nome = ?, especie = ?, raca = ?, idade = ?, tutor_id = ? WHERE id = ?',
    [nome, especie, raca, idade, tutor_id, id],
    (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar animal' });
        }
        res.json({ message: 'Animal atualizado com sucesso' });
    }
);
};

exports.deleteAnimal = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM animais WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Animal deletado com sucesso' });
  });
};



