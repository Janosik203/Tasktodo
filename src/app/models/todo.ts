export type Todo = {
  // _id: string // Do stworzenia
  id?: number // DO usuniecia
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
