import { Request, Response } from "express";
import * as userService from "../service/serviceUser";

export async function createUser(req: Request, res: Response) {

  try {

    const { nome, email, telefone } = req.body;

    const user = await userService.createUser(
      nome,
      email,
      telefone
    );

    return res.status(201).json(user);

  } catch (error: any) {

    return res.status(400).json({
      error: error.message
    });

  }

}