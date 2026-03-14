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

  const columnExists = await columnRepository.findColumnByOrder(
    ordem,
    quadro_id
  );

  if (columnExists) {
    throw new Error("Já existe uma coluna com essa ordem neste quadro");
  }

  return columnRepository.createColumn(
    nome,
    ordem,
    quadro_id
  );

}

export async function getColumn(columnId: number) {

  if (!columnId) {
    throw new Error("id da coluna é obrigatório");
  }

  const column = await columnRepository.findColumnById(columnId);

  if (!column) {
    throw new Error("Coluna não encontrada");
  }

  const cards = await columnRepository.findCardsByColumnId(columnId);

  const cardsDict: Record<number, string> = {};

  for (const card of cards) {
    cardsDict[card.id] = card.titulo;
  }

  return {
    ...column,
    cards: cardsDict
  };

}