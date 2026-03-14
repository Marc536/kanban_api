import { pool } from "../db/connection";

export async function findColumnById(id:number){

  const result = await pool.query(
    "SELECT id FROM coluna WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export async function findUserById(id:number){

  const result = await pool.query(
    "SELECT id FROM usuario WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export async function createCard(
  titulo:string,
  descricao:string,
  coluna_id:number,
  usuario_id:number
){

  const query = `
  INSERT INTO card (titulo,descricao,coluna_id,usuario_id)
  VALUES ($1,$2,$3,$4)
  RETURNING *
  `;

  const result = await pool.query(query,[
    titulo,
    descricao,
    coluna_id,
    usuario_id
  ]);

  return result.rows[0];
}

export async function findCardById(id:number){

  const result = await pool.query(
    "SELECT coluna_id FROM card WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export async function findBoardByColumn(coluna_id:number){

  const result = await pool.query(
    "SELECT quadro_id FROM coluna WHERE id=$1",
    [coluna_id]
  );

  return result.rows[0];
}

export async function updateCardColumn(card_id:number,coluna_id:number){

  await pool.query(
    "UPDATE card SET coluna_id=$1 WHERE id=$2",
    [coluna_id,card_id]
  );

}

export async function getCardById(id:number){

  const query = `
  SELECT *
  FROM card
  WHERE id = $1
  `;

  const result = await pool.query(query,[id]);

  return result.rows[0];

}