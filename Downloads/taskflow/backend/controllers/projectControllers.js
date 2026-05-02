let projects = [
  { id: 1, name: "TaskFlow", description: "Application de gestion des tâches" }
];

// CREATE
const createProject = (req, res) => {
  const { name, description } = req.body;

  const newProject = {
    id: projects.length + 1,
    name,
    description
  };

  projects.push(newProject);
  res.status(201).json(newProject);
};

// GET ALL
const getProjects = (req, res) => {
  res.json(projects);
};

// GET BY ID
const getProjectById = (req, res) => {
  const id = parseInt(req.params.id);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(404).json({ message: "Projet non trouvé" });
  }

  res.json(project);
};

// UPDATE
const updateProject = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(404).json({ message: "Projet non trouvé" });
  }

  project.name = name;
  project.description = description;

  res.json(project);
};

// DELETE
const deleteProject = (req, res) => {
  const id = parseInt(req.params.id);

  const index = projects.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Projet non trouvé" });
  }

  const deleted = projects.splice(index, 1);
  res.json(deleted[0]);
};

// EXPORT (UNE SEULE FOIS ✅)
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};