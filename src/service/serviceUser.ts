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

export async function getUser(id: number) {

  if (!id) {
    throw new Error("id é obrigatório");
  }

  const user = await userRepository.getUser(id);

  if (!user) {
    throw new Error("usuário não encontrado");
  }

  return user;

}