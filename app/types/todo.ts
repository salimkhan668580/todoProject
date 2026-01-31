export interface TodoItem {
  _id: string;
  userId: string;
  title: string;
  isDone: boolean;
  doneTime: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface CreateTodoResponse {
  success: boolean;
  message: string;
}

export interface GetTodosResponse {
  success: boolean;
  message: string;
  data: TodoItem[];
  pagination: PaginationMeta;
}

export interface DeleteTodoResponse {
  success: boolean;
  message: string;
}

export interface WorkDoneResponse {
  success: boolean;
  message: string;
}
