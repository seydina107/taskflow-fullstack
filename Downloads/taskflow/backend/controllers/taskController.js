let tasks = [
  {
    id: 1,
    title: "Créer le backend",
    description: "Préparer Express et les routes",
    completed: false,
    status: "todo",
    projectId: 1,
    userId: 1,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Créer le frontend",
    description: "Préparer l'interface React",
    completed: false,
    status: "todo",
    projectId: 1,
    userId: 1,
    createdAt: new Date()
  }
];

// Créer une tâche
const createTask = async (req, res) => {
  const { title, description, completed, projectId, status } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: completed || false,
    status: status || "todo",
    projectId,
    userId: req.user.id,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Lire toutes les tâches de l'utilisateur connecté
const getTasks = async (req, res) => {
  const userTasks = tasks.filter(
    (task) => task.userId === req.user.id
  );

  res.json(userTasks);
};

// Lire une tâche par ID
const getTaskById = async (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Tâche introuvable" });
  }

  if (task.userId !== req.user.id) {
    return res.status(403).json({ message: "Accès interdit" });
  }

  res.json(task);
};

// Modifier une tâche
const updateTask = async (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Tâche introuvable" });
  }

  if (task.userId !== req.user.id) {
    return res.status(403).json({ message: "Accès interdit" });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;

  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  if (req.body.status !== undefined) {
    task.status = req.body.status;
  }

  if (req.body.projectId !== undefined) {
    task.projectId = req.body.projectId;
  }

  res.json(task);
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Tâche introuvable" });
  }

  if (task.userId !== req.user.id) {
    return res.status(403).json({ message: "Accès interdit" });
  }

  tasks = tasks.filter((t) => t.id !== Number(req.params.id));

  res.json({ message: "Tâche supprimée avec succès" });
};

// Lire les tâches d'un projet précis pour l'utilisateur connecté
const getTasksByProject = async (req, res) => {
  const projectId = Number(req.params.projectId);

  const filteredTasks = tasks.filter(
    (task) =>
      task.projectId === projectId &&
      task.userId === req.user.id
  );

  res.json(filteredTasks);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByProject
};