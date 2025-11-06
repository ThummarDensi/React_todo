const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

const router = express.Router();

// Get all todos for user
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, completed, priority, search } = req.query;
    
    let query = { user: req.user.id };
    
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Todo.countDocuments(query);
    
    res.json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new todo
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, priority, dueDate, tags } = req.body;
    
    const todo = await Todo.create({
      title,
      description,
      priority,
      dueDate,
      tags,
      user: req.user.id
    });
    
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update todo
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        todo[key] = req.body[key];
      }
    });
    
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: 'Todo removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;