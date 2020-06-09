/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  sortKey: string
  partitionKey: string
  name: string
  dueDate: string
}
