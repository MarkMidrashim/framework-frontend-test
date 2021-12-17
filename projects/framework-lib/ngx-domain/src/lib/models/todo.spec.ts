import { ITodo } from '../interfaces/todo.interface';
import { publicTodoMock } from './todo';

const todoMock: ITodo = publicTodoMock;

describe('Tests TodoModel', () => {
  it('should test ITodo with value', () => {
    const todoModel: ITodo = {
      id: todoMock.id,
      title: todoMock.title,
      completed: todoMock.completed,
      userId: todoMock.userId
    };
    expect(todoModel.id).toEqual(todoMock.id);
    expect(todoModel.title).toEqual(todoMock.title);
    expect(todoModel.completed).toEqual(todoMock.completed);
    expect(todoModel.userId).toEqual(todoMock.userId);
  });
});
