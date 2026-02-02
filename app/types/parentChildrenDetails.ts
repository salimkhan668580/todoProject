export interface  parentChildrenDetailsResponse {
  success: boolean
  message: string
  data: ChildrenData
}

export interface ChildrenData {
  _id: string
  name: string
  role: string
  image: string
  email: string
  createdAt: string
  updatedAt: string
  todos: Todo[]
  totalTodos: number
  doneTodos: number
  pendingTodos: number
}

export interface Todo {
  _id: string
  userId: string
  title: string
  isDone: boolean
  doneTime: any
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
