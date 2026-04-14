const Task = require('../models/Task');

const { resolveAssignedUserId } = require('../utils/resolveAssignedUserId');

const createTask = async (req, res) => {

  try {

    if (!req.user || !req.user.id) {

      return res.status(401).json({

        message: 'Utilisateur non authentifié'

      });

    }

    const { title, description, done, priority, assignedUserId } = req.body;

    if (!title || !title.trim()) {

      return res.status(400).json({

        message: 'Le titre est obligatoire'

      });

    }

    const resolvedAssignedUserId = await resolveAssignedUserId(assignedUserId);

    if (resolvedAssignedUserId && resolvedAssignedUserId.error) {

      return res.status(400).json({

        message: resolvedAssignedUserId.error

      });

    }

    const task = await Task.create({

      title: title.trim(),

      description,

      done,

      priority,

      userId: req.user.id,

      assignedUserId: resolvedAssignedUserId

    });

    return res.status(201).json({

      message: 'Tâche créée avec succès',

      task

    });

  } catch (error) {

    console.error('Erreur createTask :', error);

    return res.status(500).json({

      message: 'Erreur serveur lors de la création de la tâche'

    });

  }

};

const getTasks = async (req, res) => {

  try {

    if (!req.user || !req.user.id) {

      return res.status(401).json({

        message: 'Utilisateur non authentifié'

      });

    }

    const tasks = await Task.find({

      $or: [

        { userId: req.user.id },

        { assignedUserId: req.user.id }

      ]

    }).sort({ createdAt: -1 });

    return res.status(200).json({

      message: 'Tâches récupérées avec succès',

      tasks

    });

  } catch (error) {

    console.error('Erreur getTasks :', error);

    return res.status(500).json({

      message: 'Erreur serveur lors de la récupération des tâches'

    });

  }

};

module.exports = {

  createTask,

  getTasks

};
 