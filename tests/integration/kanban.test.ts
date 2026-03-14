import request from "supertest";
import app from "../../src/app";
import { pool } from "../../src/db/connection";

describe("Kanban API Integration", () => {

  let userId: number;
  let boardId: number;
  let columnId: number;
  let cardId: number;

  test("create user", async () => {

    const res = await request(app)
      .post("/users")
      .send({
        nome: "Marcelo Test",
        email: "marcelo@test.com",
        telefone: "119999999"
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

    userId = res.body.id;

  });

  test("create board", async () => {

    const res = await request(app)
      .post("/boards")
      .send({
        nome: "Projeto Teste"
      });

    expect(res.status).toBe(201);

    boardId = res.body.id;

  });

  test("create column", async () => {

    const res = await request(app)
      .post("/columns")
      .send({
        nome: "Todo",
        ordem: 1,
        quadro_id: boardId
      });

    expect(res.status).toBe(201);

    columnId = res.body.id;

  });

  test("create card", async () => {

    const res = await request(app)
      .post("/cards")
      .send({
        titulo: "Criar API",
        descricao: "Testando integração",
        coluna_id: columnId,
        usuario_id: userId
      });

    expect(res.status).toBe(201);

    cardId = res.body.id;

  });

  test("move card", async () => {

    const res = await request(app)
      .patch(`/cards/${cardId}/move`)
      .send({
        coluna_id: columnId
      });

    expect(res.status).toBe(200);

  });

  test("get board", async () => {

    const res = await request(app)
      .get(`/boards/${boardId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(boardId);

  });

  test("delete board", async () => {

    const res = await request(app)
      .delete(`/boards/${boardId}`);

    expect(res.status).toBe(200);

  });

  test("delete user", async () => {

    const res = await request(app)
      .delete(`/users/${userId}`);

    expect(res.status).toBe(200);

  });

});

afterAll(async () => {
  await pool.end();
});