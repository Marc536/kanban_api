import * as columnRepository from "../repository/repositoryColumn";

export async function createColumn(
  nome: string,
  ordem: number,
  quadro_id: number
) {

  if (!nome || !ordem || !quadro_id) {
    throw new Error("nome, ordem e quadro_id são obrigatórios");
  }

  const board = await columnRepository.findBoardById(quadro_id);

  if (!board) {
    throw new Error("Quadro não encontrado");
  }

  return columnRepository.createColumn(
    nome,
    ordem,
    quadro_id
  );

}