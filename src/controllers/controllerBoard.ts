import { Request, Response } from "express";
import * as boardRepository from "../repository/repositoryBoard";

export async function createBoard(req: Request, res: Response) {

  try {

    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        error: "nome do quadro é obrigatório"
      });
    }

    const board = await boardRepository.createBoard(nome);

    return res.status(201).json(board);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar quadro"
    });

  }

}