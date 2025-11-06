import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material'; // Removed FilterIcon import

const TodoFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    completed: '',
    priority: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      completed: '',
      priority: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <Box mb={3} p={2} border={1} borderColor="divider" borderRadius={1}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search todos"
            variant="outlined"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            size="small"
          />
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.completed}
              label="Status"
              onChange={(e) => handleFilterChange('completed', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="false">Active</MenuItem>
              <MenuItem value="true">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              value={filters.priority}
              label="Priority"
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={clearFilters}
            startIcon={<ClearIcon />}
            size="small"
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodoFilter;