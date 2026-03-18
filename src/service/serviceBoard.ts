import * as boardRepository from "../repository/repositoryBoard";

export async function createBoard(nome: string) {

  if (!nome) {
    throw new Error("nome do quadro é obrigatório");
  }

  const board = await boardRepository.createBoard(nome);

  return board;

}

export async function getBoards() {

  const boardsMap: Record<number, any> = {};
  const result = await boardRepository.getBoards();

  for (const row of result.rows) {

    if (!boardsMap[row.board_id]) {
      boardsMap[row.board_id] = {
        id: row.board_id,
        nome: row.board_nome,
        columns: {}
      };
    }

    if (row.column_id) {
      boardsMap[row.board_id].columns[row.column_id] = {
        nome: row.column_nome,
        ordem: row.ordem
      };
    }

  }

  return Object.values(boardsMap);

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