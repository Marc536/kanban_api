import { Request, Response } from "express";
import * as cardRepository from "../repository/repositoryCard";

export async function createCard(req: Request, res: Response) {

  try {

    const { titulo, descricao, coluna_id, usuario_id } = req.body;

    if (!titulo || !coluna_id || !usuario_id) {
      return res.status(400).json({
        error: "titulo, coluna_id e usuario_id são obrigatórios"
      });
    }

    const coluna = await cardRepository.findColumnById(coluna_id);

    if (!coluna) {
      return res.status(404).json({
        error: "Coluna não encontrada"
      });
    }

    const usuario = await cardRepository.findUserById(usuario_id);

    if (!usuario) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    const card = await cardRepository.createCard(
      titulo,
      descricao,
      coluna_id,
      usuario_id
    );

    return res.status(201).json(card);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar o card"
    });

  }

}

export async function moveCard(req: Request, res: Response) {

  try {

    const cardId = Number(req.params.id);
    const { targetColumnId } = req.body;

    const card = await cardRepository.findCardById(cardId);

    if (!card) {
      return res.status(404).json({
        error: "Card não encontrado"
      });
    }

    const sourceColumn = card.coluna_id;

    const sourceBoard = await cardRepository.findBoardByColumn(sourceColumn);
    const targetBoard = await cardRepository.findBoardByColumn(targetColumnId);

    if (!sourceBoard || !targetBoard) {
      return res.status(404).json({
        error: "Coluna não encontrada"
      });
    }

    if (sourceBoard.quadro_id !== targetBoard.quadro_id) {
      return res.status(400).json({
        error: "Card só pode mover dentro do mesmo quadro"
      });
    }

    await cardRepository.updateCardColumn(
      cardId,
      targetColumnId
    );

    return res.json({
      message: "Card movido com sucesso"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao mover o card"
    });

  }

}