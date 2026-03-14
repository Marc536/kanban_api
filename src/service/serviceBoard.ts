import * as boardRepository from "../repository/repositoryBoard";

export async function createBoard(nome: string) {

  if (!nome) {
    throw new Error("nome do quadro é obrigatório");
  }

  const board = await boardRepository.createBoard(nome);

  return board;

}

export async function getBoards() {

  const boards = await boardRepository.findAllBoards();

  const result = [];

  for (const board of boards) {

    const columns = await boardRepository.findColumnsByBoardId(board.id);

    const columnsDict: Record<number, any> = {};

    for (const column of columns) {
      columnsDict[column.id] = {
        nome: column.nome,
        ordem: column.ordem
      };
    }

    result.push({
      ...board,
      columns: columnsDict
    });

  }

  return result;

}

export async function getBoard(boardId: number) {

  if (!boardId) {
    throw new Error("id do quadro é obrigatório");
  }

  const board = await boardRepository.findBoardById(boardId);

  if (!board) {
    throw new Error("Quadro não encontrado");
  }

  const columns = await boardRepository.findColumnsByBoardId(boardId);

  const columnsDict: Record<number, any> = {};

  for (const column of columns) {
    columnsDict[column.id] = {
      nome: column.nome,
      ordem: column.ordem
    };
  }

  return {
    ...board,
    columns: columnsDict
  };

}

export async function deleteBoard(boardId: number) {

  if (!boardId) {
    throw new Error("id do quadro é obrigatório");
  }

  const board = await boardRepository.findBoardById(boardId);

  if (!board) {
    throw new Error("Quadro não encontrado");
  }

  await boardRepository.deleteBoard(boardId);

}