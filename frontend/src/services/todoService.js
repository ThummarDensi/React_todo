import api from './api';

export const getTodos = (params = {}) => {
  return api.get('/todos', { params });
};

export const createTodo = (todoData) => {
  return api.post('/todos', todoData);
};

export const updateTodo = (id, todoData) => {
  return api.put(`/todos/${id}`, todoData);
};

export const deleteTodo = (id) => {
  return api.delete(`/todos/${id}`);
};