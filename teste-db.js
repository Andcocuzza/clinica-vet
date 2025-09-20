/*/ teste-db.js
require('dotenv').config();
const connection = require('./db'); // importa o pool do db.js

// Teste de conexão
connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
  if (err) {
    console.error("❌ Erro ao executar query de teste:", err.message || err);
  } else {
    console.log("✅ Conexão OK! Resultado do teste (deve ser 2):", results[0].resultado);
  }
  process.exit(0); // encerra o script
});
*/

// teste-db.js
// teste-db.js
require('dotenv').config();
const connection = require('./db'); // importa o pool do db.js

const database = process.env.DB_NAME;

connection.query(
  `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
  [database],
  async (err, tables) => {
    if (err) {
      console.error("❌ Erro ao listar tabelas:", err.message || err);
      return process.exit(1);
    }

    if (tables.length === 0) {
      console.log(`⚠️ Nenhuma tabela encontrada no banco ${database}.`);
      return process.exit(0);
    }

    console.log(`✅ Tabelas encontradas no banco ${database}:`);
    tables.forEach((t) => console.log(" -", t.TABLE_NAME));

    let tabelasComDados = 0;
    let tabelasVazias = 0;

    for (const t of tables) {
      const tabela = t.TABLE_NAME;

      // Pega total de registros
      const [total] = await new Promise((resolve) => {
        connection.query(`SELECT COUNT(*) AS total FROM ${tabela}`, (err, results) => {
          if (err) return resolve([{ total: -1 }]);
          resolve(results);
        });
      });

      // Pega até 5 registros
      const registros = await new Promise((resolve) => {
        connection.query(`SELECT * FROM ${tabela} LIMIT 5`, (err, results) => {
          if (err) return resolve([]);
          resolve(results);
        });
      });

      console.log(`\n📋 Tabela: ${tabela} (Total de registros: ${total.total})`);

      if (registros.length === 0) {
        console.log(`⚠️ A tabela está vazia.`);
        tabelasVazias++;
      } else {
        console.table(registros);
        tabelasComDados++;
      }
    }

    console.log(`\n✅ Resumo geral:`);
    console.log(`Tabelas com dados: ${tabelasComDados}`);
    console.log(`Tabelas vazias: ${tabelasVazias}`);

    connection.end();
    process.exit(0);
  }
);






