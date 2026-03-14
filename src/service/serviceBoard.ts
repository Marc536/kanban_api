import * as boardRepository from "../repository/repositoryBoard";

export async function createBoard(nome: string) {

  if (!nome) {
    throw new Error("nome do quadro é obrigatório");
  }

  const board = await boardRepository.createBoard(nome);

  return board;

}