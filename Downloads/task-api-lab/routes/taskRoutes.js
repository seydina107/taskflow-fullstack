const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/tasks', authMiddleware, createTask);
router.get('/tasks', authMiddleware, getTasks);
module.exports = router;