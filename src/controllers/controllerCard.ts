import { Request, Response } from "express";
import * as cardService from "../service/serviceCard";

export async function createCard(req: Request, res: Response) {

  try {

    const { titulo, descricao, coluna_id, usuario_id } = req.body;

    const card = await cardService.createCard(
      titulo,
      descricao,
      coluna_id,
      usuario_id
    );

    return res.status(201).json(card);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}

export async function moveCard(req: Request, res: Response) {

  try {

    const cardId = Number(req.params.id);
    const { targetColumnId } = req.body;

    const result = await cardService.moveCard(
      cardId,
      targetColumnId
    );

    return res.json(result);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}

export async function getCard(req: Request, res: Response) {

  try {

    const cardId = Number(req.params.id);

    const card = await cardService.getCard(cardId);

    return res.status(200).json(card);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}