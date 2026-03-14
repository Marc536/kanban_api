import { pool } from "../db/connection";

export async function findBoardById(id: number) {
  const result = await pool.query(
    "SELECT id FROM quadro WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export async function createColumn(nome: string, ordem: number, quadro_id: number) {

  const query = `
    INSERT INTO coluna (nome, ordem, quadro_id)
    VALUES ($1,$2,$3)
    RETURNING *
  `;

  const result = await pool.query(query, [
    nome,
    ordem,
    quadro_id
  ]);

  return result.rows[0];
}

export async function findColumnByOrder(
  ordem: number,
  quadro_id: number
) {

  const result = await pool.query(
    "SELECT id FROM coluna WHERE ordem=$1 AND quadro_id=$2",
    [ordem, quadro_id]
  );

  return result.rows[0];

}