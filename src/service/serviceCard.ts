import * as cardRepository from "../repository/repositoryCard";

export async function createCard(
  titulo: string,
  descricao: string,
  coluna_id: number,
  usuario_id: number
) {

  if (!titulo || !coluna_id || !usuario_id) {
    throw new Error("titulo, coluna_id e usuario_id são obrigatórios");
  }

  const coluna = await cardRepository.findColumnById(coluna_id);

  if (!coluna) {
    throw new Error("Coluna não encontrada");
  }

  const usuario = await cardRepository.findUserById(usuario_id);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return cardRepository.createCard(
    titulo,
    descricao,
    coluna_id,
    usuario_id
  );
}

export async function moveCard(
  cardId: number,
  targetColumnId: number
) {

  const card = await cardRepository.findCardById(cardId);

  if (!card) {
    throw new Error("Card não encontrado");
  }

  const sourceColumn = card.coluna_id;

  const sourceBoard = await cardRepository.findBoardByColumn(sourceColumn);
  const targetBoard = await cardRepository.findBoardByColumn(targetColumnId);

  if (!sourceBoard || !targetBoard) {
    throw new Error("Coluna não encontrada");
  }

  if (sourceBoard.quadro_id !== targetBoard.quadro_id) {
    throw new Error("Card só pode mover dentro do mesmo quadro");
  }

  await cardRepository.updateCardColumn(
    cardId,
    targetColumnId
  );

  return { message: "Card movido com sucesso" };
}

export async function getCard(cardId: number) {

  if (!cardId) {
    throw new Error("id do card é obrigatório");
  }

  const card = await cardRepository.getCardById(cardId);

  if (!card) {
    throw new Error("Card não encontrado");
  }

  return card;

}