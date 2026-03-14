import { Router } from "express";
import * as controllerUser from "../controllers/controllerUser";
import * as controllerBoard from "../controllers/controllerBoard";
import * as controllerColumn from "../controllers/controllerColumn";
import * as controllerCard from "../controllers/controllerCard";

const router = Router();

router.post("/users", controllerUser.createUser);
router.get("/users/:id", controllerUser.getUser);
router.post("/boards", controllerBoard.createBoard);
router.post("/columns", controllerColumn.createColumn);
router.post("/cards", controllerCard.createCard);
router.get("/cards/:id", controllerCard.getCard);
router.patch("/cards/:id/move", controllerCard.moveCard);

export default router;