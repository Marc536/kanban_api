import * as userRepository from "../repository/repositoryUser";

export async function createUser(
  nome: string,
  email: string,
  telefone?: string
) {

  if (!nome || !email) {
    throw new Error("nome e email são obrigatórios");
  }

  const user = await userRepository.createUser(
    nome,
    email,
    telefone
  );

  return user;

}