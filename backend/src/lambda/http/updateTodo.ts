import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS)
const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const docClient = new XAWS.DynamoDB.DocumentClient()

  todoId //avoid sls compiling errors
  updatedTodo //avoid sls compiling errors
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  var params = {
    TableName: todosTable,
    Key: {
      partitionKey: todoId,
      sortKey: '2020-07-11' //change this to be dynamic
    },
    UpdateExpression: 'set #n = :newName',
    ExpressionAttributeValues: { ':newName': updatedTodo.name },
    ExpressionAttributeNames: { '#n': 'name' }
  }
  await docClient.update(params).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      newItem: updatedTodo
    })
  }
}
