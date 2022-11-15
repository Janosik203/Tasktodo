export type Todo = {
  _id: string
  id?: number

  tagName?: string
  name: string
  description?: string
  isDone: boolean
  isEditing?: boolean
}

export type CreateTodoDto = {
  tagName?: string
  name: string
  description?: string
  isDone: boolean
}
