import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'

import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS)
const todosTable = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const docClient = new XAWS.DynamoDB.DocumentClient()

  var todoItem = {
    Key: {
      partitionKey: todoId,
      sortKey: '2020-06-11' //change this to be dynamic
    },
    TableName: todosTable
  }
  await docClient.delete(todoItem).promise()

  return {
    statusCode: 204,
    body: ''
  }
}
