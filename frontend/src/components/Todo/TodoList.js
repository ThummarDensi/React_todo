import React from 'react';
import {
  List,
  Typography,
  Box
} from '@mui/material';
import TodoItem from './TodoItem';
import Loading from '../Common/Loading';

const TodoList = ({ todos, onEdit, onUpdate, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (todos.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No todos found. Create your first todo!
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onEdit={onEdit}
          onUpdate={onUpdate}
        />
      ))}
    </List>
  );
};

export default TodoList;