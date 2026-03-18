import { pool } from "../db/connection";

export async function createBoard(nome: string) {

  const query = `
    INSERT INTO quadro (nome)
    VALUES ($1)
    RETURNING *
  `;

  const result = await pool.query(query, [nome]);

  return result.rows[0];
}

export async function findAllBoards() {

  const result = await pool.query(
    "SELECT * FROM quadro"
  );

  return result.rows;

}

export async function findBoardById(id: number) {

  const result = await pool.query(
    "SELECT * FROM quadro WHERE id=$1",
    [id]
  );

  return result.rows[0];

}

export async function findColumnsByBoardId(quadro_id: number) {

  const result = await pool.query(
    "SELECT id, nome, ordem FROM coluna WHERE quadro_id=$1",
    [quadro_id]
  );

  return result.rows;

}

export async function deleteBoard(id: number) {

  await pool.query(
    "DELETE FROM quadro WHERE id=$1",
    [id]
  );

}

export async function getBoards() {
  const result = await pool.query(`
    SELECT 
      q.id AS board_id,
      q.nome AS board_nome,
      c.id AS column_id,
      c.nome AS column_nome,
      c.ordem
    FROM quadro q
    LEFT JOIN coluna c ON c.quadro_id = q.id
    ORDER BY q.id, c.ordem
  `);

  return result
}