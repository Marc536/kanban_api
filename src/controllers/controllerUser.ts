import { Request, Response } from "express";
import * as userRepository from "../repository/repositoryUser";

export async function createUser(req: Request, res: Response) {

  try {

    const { nome, email, telefone } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        error: "nome e email são obrigatórios"
      });
    }

    const user = await userRepository.createUser(
      nome,
      email,
      telefone
    );

    return res.status(201).json(user);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar usuário"
    });

  }

}