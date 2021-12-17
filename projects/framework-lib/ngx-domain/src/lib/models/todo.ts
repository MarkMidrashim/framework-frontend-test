import { ITodo } from "../interfaces/todo.interface";

export class Todo implements ITodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;

  constructor(rawData: ITodo) {
    this.id = rawData.id;
    this.title = rawData.title;
    this.completed = rawData.completed;
    this.userId = rawData.userId;
  }
}

export const publicTodoMock: ITodo = {
  id: 1,
  title: "delectus aut autem",
  completed: false,
  userId: 1
};
