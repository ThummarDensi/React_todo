import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Pagination
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { useAuth } from '../contexts/AuthContext';
import { getTodos } from '../services/todoService';
import TodoList from './Todo/TodoList';
import TodoForm from './Todo/TodoForm';
import TodoFilter from './Todo/TodoFilter';
import Loading from './Common/Loading';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    completed: '',
    priority: ''
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    total: 0
  });

  const { user } = useAuth();

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTodos(filters);
      setTodos(response.data.todos);
      setPagination({
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  const handleTodoUpdate = () => {
    fetchTodos();
    handleFormClose();
  };

  if (loading && todos.length === 0) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Fixed Grid syntax - removed 'item' prop and used 'size' instead of 'xs' */}
      <Grid container spacing={3}>
        <Grid size={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography component="h1" variant="h4">
                Welcome, {user?.username}!
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowForm(true)}
              >
                Add Todo
              </Button>
            </Box>

            <TodoFilter onFilterChange={handleFilterChange} />

            <TodoList
              todos={todos}
              onEdit={handleEdit}
              onUpdate={fetchTodos}
              loading={loading}
            />

            {pagination.totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <TodoForm
        open={showForm}
        onClose={handleFormClose}
        onSave={handleTodoUpdate}
        todo={editingTodo}
      />
    </Container>
  );
};

export default Dashboard;