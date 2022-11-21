import { Router } from "express";

import { TodosController } from "../controllers/todos";

const router = Router();

const todosController = new TodosController();

// / => GET
router.get("/", todosController.getTodos);

// /todo => POST
router.post("/todo", todosController.createTodo);

// /todo/:todoId => PUT
router.put("/todo/:todoId", todosController.updateTodo);

// /todo/:todoId => DELETE
router.delete("/todo/:todoId", todosController.deleteTodo);

export default router;
