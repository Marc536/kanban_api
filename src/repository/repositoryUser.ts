import { pool } from "../db/connection";

export async function createUser(nome: string,email: string,telefone: string){

  const query = `
  INSERT INTO usuario (nome,email,telefone)
  VALUES ($1,$2,$3)
  RETURNING *
  `;

  const result = await pool.query(query,[
    nome,
    email,
    telefone
  ]);

  return result.rows[0];
}