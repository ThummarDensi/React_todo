import React, { useState } from 'react';
import {
  ListItem,
  IconButton,
  Checkbox,
  Chip,
  Box,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

import { updateTodo, deleteTodo } from '../../services/todoService';

const TodoItem = ({ todo, onEdit, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  const handleToggleComplete = async () => {
    try {
      setLoading(true);
      await updateTodo(todo._id, { completed: !todo.completed });
      onUpdate();
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      setLoading(true);
      await deleteTodo(todo._id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <ListItem
      divider
      sx={{
        opacity: todo.completed ? 0.7 : 1,
        backgroundColor: todo.completed ? 'action.hover' : 'background.paper'
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={loading}
      />
      
      <Box sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography
            variant="body1"
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              fontWeight: todo.priority === 'high' ? 'bold' : 'normal'
            }}
          >
            {todo.title}
          </Typography>
          
          <Chip
            label={todo.priority}
            size="small"
            color={getPriorityColor(todo.priority)}
            variant="outlined"
          />
        </Box>
        
        {todo.description && (
          <Typography variant="body2" color="textSecondary" paragraph sx={{ mb: 1 }}>
            {todo.description}
          </Typography>
        )}
        
        <Box display="flex" gap={1} flexWrap="wrap">
          {todo.tags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
          
          {todo.dueDate && (
            <Chip
              icon={<CalendarIcon />}
              label={formatDate(todo.dueDate)}
              size="small"
              variant="outlined"
              color={isOverdue(todo.dueDate) && !todo.completed ? 'error' : 'default'}
            />
          )}
        </Box>
      </Box>
      
      <Box>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => onEdit(todo)}
          disabled={loading}
          sx={{ mr: 1 }}
        >
          <EditIcon />
        </IconButton>
        
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleDelete}
          disabled={loading}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default TodoItem;