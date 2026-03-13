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