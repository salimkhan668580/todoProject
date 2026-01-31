import axiosInstance from "../axios/axiosInstance";
import {
  CreateTodoResponse,
  GetTodosResponse,
  DeleteTodoResponse,
  WorkDoneResponse,
} from "../types/todo";

class TodoService {
  async create(title: string): Promise<CreateTodoResponse> {
    const res = await axiosInstance.post("/api/user/create", { title });
    return res.data;
  }

  async getTodosByDay(day: string = "today"): Promise<GetTodosResponse> {
    const res = await axiosInstance.get("/api/user/todo", {
      params: { day },
    });
    return res.data;
  }

  async getAllTodos(): Promise<GetTodosResponse> {
    const res = await axiosInstance.get("/api/user/todo");
    return res.data;
  }

  async deleteTodo(todoId: string): Promise<DeleteTodoResponse> {
    const res = await axiosInstance.delete("/api/user/", {
      data: { todoId },
    });
    return res.data;
  }

  async markTodoDone(todoId: string): Promise<WorkDoneResponse> {
    const res = await axiosInstance.post("/api/user/done", { todoId });
    return res.data;
  }
}

export const todoService = new TodoService();
