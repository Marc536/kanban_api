import { Request, Response } from "express";
import * as boardService from "../service/serviceBoard";

export async function createBoard(req: Request, res: Response) {

  try {

    const { nome } = req.body;

    const board = await boardService.createBoard(nome);

    return res.status(201).json(board);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}

export async function getBoards(req: Request, res: Response) {

  try {

    const boards = await boardService.getBoards();

    return res.status(200).json(boards);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}

export async function getBoard(req: Request, res: Response) {

  try {

    const boardId = Number(req.params.id);

    const board = await boardService.getBoard(boardId);

    return res.status(200).json(board);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}