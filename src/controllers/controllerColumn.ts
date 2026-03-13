import { Request, Response } from "express";
import * as columnRepository from "../repository/repositoryColumn";

export async function createColumn(req: Request, res: Response) {

  try {

    const { nome, ordem, quadro_id } = req.body;

    if (!nome || !ordem || !quadro_id) {
      return res.status(400).json({
        error: "nome, ordem e quadro_id são obrigatórios"
      });
    }

    const board = await columnRepository.findBoardById(quadro_id);

    if (!board) {
      return res.status(404).json({
        error: "Quadro não encontrado"
      });
    }

    const column = await columnRepository.createColumn(
      nome,
      ordem,
      quadro_id
    );

    return res.status(201).json(column);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar coluna"
    });

  }

}