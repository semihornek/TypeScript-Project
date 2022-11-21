import { NextFunction, Request, Response } from "express";
import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoId: string };

export class TodosController {
  private todos: Todo[];
  constructor() {
    this.todos = [];
  }

  getTodos = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ todos: this.todos });
  };

  createTodo = (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body as RequestBody;

    const newTodo: Todo = {
      id: new Date().toISOString(),
      text,
    };
    this.todos.push(newTodo);

    res.status(201).json({ message: "Added todo", todo: newTodo, todos: this.todos });
  };

  updateTodo = (req: Request, res: Response, next: NextFunction) => {
    const { todoId } = req.params as RequestParams;
    const { text } = req.body as RequestBody;

    const todoIndex = this.todos.findIndex((todoItem) => todoItem.id === todoId);
    if (todoIndex !== -1) {
      this.todos[todoIndex] = { id: todoId, text };
      return res.status(200).json({ message: "Updated todo", todos: this.todos });
    }
    res.status(404).json({ message: "Could not find todo for this id" });
  };

  deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    const { todoId } = req.params as RequestParams;

    const todoIndex = this.todos.findIndex((todoItem) => todoItem.id === todoId);
    if (todoIndex !== -1) {
      this.todos.splice(todoIndex, 1);
      return res.status(200).json({ message: "Todo deleted", todos: this.todos });
    }
    res.status(404).json({ message: "Could not find todo for this id" });
  };
}
