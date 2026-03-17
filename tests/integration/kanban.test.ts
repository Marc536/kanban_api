import request from "supertest";
import app from "../../src/app";
import { pool } from "../../src/db/connection";

describe("Kanban API Integration", () => {

  let userId: number;
  let boardId: number;
  let columnIdTodo: number;
  let columnIdWip: number;
  let cardId: number;

  // ---- Happy Path ----
  test("create user", async () => {
    const res = await request(app).post("/users").send({
      nome: "Marcelo Test",
      email: "marcelo@test.com",
      telefone: "119999999"
    });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    userId = res.body.id;
  });

  test("create board", async () => {
    const res = await request(app).post("/boards").send({ nome: "Projeto Teste" });
    expect(res.status).toBe(201);
    boardId = res.body.id;
  });

  test("create column Todo", async () => {
    const res = await request(app).post("/columns").send({
      nome: "Todo",
      ordem: 1,
      quadro_id: boardId
    });
    expect(res.status).toBe(201);
    columnIdTodo = res.body.id;
  });

  test("create column Wip", async () => {
    const res = await request(app).post("/columns").send({
      nome: "WIP",
      ordem: 2,
      quadro_id: boardId
    });
    expect(res.status).toBe(201);
    columnIdWip = res.body.id;
  });

  test("create card", async () => {
    const res = await request(app).post("/cards").send({
      titulo: "Criar API",
      descricao: "Testando integração",
      coluna_id: columnIdTodo,
      usuario_id: userId
    });
    expect(res.status).toBe(201);
    cardId = res.body.id;
  });

  test("move card", async () => {
    const res = await request(app).patch(`/cards/${cardId}/move`).send({
      coluna_id: columnIdWip
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Card movido com sucesso");
  });

  test("get user/board/column/card", async () => {
    const userRes = await request(app).get(`/users/${userId}`);
    expect(userRes.status).toBe(200);
    expect(userRes.body.id).toBe(userId);

    const boardRes = await request(app).get(`/boards/${boardId}`);
    expect(boardRes.status).toBe(200);
    expect(boardRes.body.id).toBe(boardId);

    const columnRes = await request(app).get(`/columns/${columnIdTodo}`);
    expect(columnRes.status).toBe(200);
    expect(columnRes.body.id).toBe(columnIdTodo);

    const cardRes = await request(app).get(`/cards/${cardId}`);
    expect(cardRes.status).toBe(200);
    expect(cardRes.body.id).toBe(cardId);
    expect(cardRes.body.coluna_id).toBe(columnIdWip)
  });

  test("delete board and user", async () => {
    const boardRes = await request(app).delete(`/boards/${boardId}`);
    expect(boardRes.status).toBe(200);

    const userRes = await request(app).delete(`/users/${userId}`);
    expect(userRes.status).toBe(200);
  });

  // ---- Error Cases ----

  test("create user with missing fields", async () => {
    const res = await request(app).post("/users").send({ nome: "Teste" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("create board without name", async () => {
    const res = await request(app).post("/boards").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("create column with invalid quadro_id", async () => {
    const res = await request(app).post("/columns").send({
      nome: "Doing",
      ordem: 1,
      quadro_id: 99999
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("create card with invalid user/column", async () => {
    const res = await request(app).post("/cards").send({
      titulo: "Erro Card",
      descricao: "Erro",
      coluna_id: 999,
      usuario_id: 999
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("move card to invalid column", async () => {
    const res = await request(app).patch(`/cards/${cardId}/move`).send({
      coluna_id: 999
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("get non-existing user/board/column/card", async () => {
    const resUser = await request(app).get("/users/99999");
    expect(resUser.status).toBe(400);
    expect(resUser.body.error).toBeDefined();

    const resBoard = await request(app).get("/boards/99999");
    expect(resBoard.status).toBe(400);
    expect(resBoard.body.error).toBeDefined();

    const resColumn = await request(app).get("/columns/99999");
    expect(resColumn.status).toBe(400);
    expect(resColumn.body.error).toBeDefined();

    const resCard = await request(app).get("/cards/99999");
    expect(resCard.status).toBe(400);
    expect(resCard.body.error).toBeDefined();
  });

  test("delete non-existing user/board", async () => {
    const resUser = await request(app).delete("/users/99999");
    expect(resUser.status).toBe(400);
    expect(resUser.body.error).toBeDefined();

    const resBoard = await request(app).delete("/boards/99999");
    expect(resBoard.status).toBe(400);
    expect(resBoard.body.error).toBeDefined();
  });

});

afterAll(async () => {
  await pool.end();
});