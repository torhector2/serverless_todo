import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

const XAWS = AWSXRay.captureAWS(AWS)
const todosTable = process.env.TODOS_TABLE
const uuid = require('uuid')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  newTodo.partitionKey = 'hector'
  newTodo.sortKey = newTodo.dueDate
  newTodo.todoId = uuid.v4()
  newTodo.done = false
  newTodo.createdAt = new Date()
  const docClient = new XAWS.DynamoDB.DocumentClient()

  // TODO: Implement creating a new TODO item

  await docClient.put({ TableName: todosTable, Item: newTodo }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      newItem: newTodo
    })
  }
}
