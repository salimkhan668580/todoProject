import { PaginationMeta } from "./todo";

export interface ChildItem {
  _id: string;
  name: string;
  role: string;
  image: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  totalTodos: number;
  doneTodos: number;
  pendingTodos: number;
}

export interface ChildrenListResponse {
  success: boolean;
  message: string;
  data: ChildItem[];
  pagination: PaginationMeta;
}
