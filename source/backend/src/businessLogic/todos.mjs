import * as uuid from 'uuid'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../dataLayer/todos.mjs'
import { createLogger } from '../utils/logger.mjs'
const logger = createLogger('todos')

export const getTodosLogic = async (userId) => {
  return getTodos(userId)
}

// Implement businessLogic
export const createTodoLogic = async (userId, todo) => {
  const todoId = uuid.v4()
  logger.info(`Creating todo ${todoId}`)
  return createTodo({
    userId,
    todoId,
    createdAt: new Date().toISOString(),
    done: false,
    ...todo
  })
}

export const updateTodoLogic = async (
  userId,
  todoId,
  todo
) => {
  return updateTodo(userId, todoId, todo)
}

export const deleteTodoLogic = async (userId, todoId) => {
  return deleteTodo(userId, todoId)
}

export async function addAttachmentUrl(bucketName, todoId, userId) {
  const attachmentUrl = `https://${bucketName}.s3.amazonaws.com/${todoId}`

  await todo.updateTodoAttachment(todoId, userId, attachmentUrl)
}