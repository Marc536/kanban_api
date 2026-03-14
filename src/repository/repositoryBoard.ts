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