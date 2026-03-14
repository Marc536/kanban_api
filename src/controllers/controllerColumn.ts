import { Request, Response } from "express";
import * as columnService from "../service/serviceColumn";

export async function createColumn(req: Request, res: Response) {

  try {

    const { nome, ordem, quadro_id } = req.body;

    const column = await columnService.createColumn(
      nome,
      ordem,
      quadro_id
    );

    return res.status(201).json(column);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}

export async function getColumn(req: Request, res: Response) {

  try {

    const columnId = Number(req.params.id);

    const column = await columnService.getColumn(columnId);

    return res.status(200).json(column);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}