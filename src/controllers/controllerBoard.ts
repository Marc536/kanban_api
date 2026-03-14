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