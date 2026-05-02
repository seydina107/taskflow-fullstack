const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByProject
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/project/:projectId", protect, getTasksByProject);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;