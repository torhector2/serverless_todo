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
  event //avoid sls compiling errors
  // TODO: Get all TODO items for a current user
  const docClient = new XAWS.DynamoDB.DocumentClient()
  const result = await docClient
    .scan({
      TableName: todosTable,
      Limit: 20
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos: result
    })
  }
}
