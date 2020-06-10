/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  createdAt: Date
  done: boolean
  todoId: any
  id: string
  sortKey: string
  partitionKey: string
  name: string
  dueDate: string
}
