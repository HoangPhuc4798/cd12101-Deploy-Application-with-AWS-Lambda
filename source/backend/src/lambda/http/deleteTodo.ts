import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { createTodoLogic } from '../../businessLogic/todos.mjs'
import { APIGatewayProxyEvent } from 'aws-lambda'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event: APIGatewayProxyEvent) => {
    const newTodo = JSON.parse(event.body)
    console.log(newTodo)
    const userId = getUserId(event)
    const todo = await createTodoLogic(userId, newTodo)
    const response = { item: todo };
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response)
    }
  })