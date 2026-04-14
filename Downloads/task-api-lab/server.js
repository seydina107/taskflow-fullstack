const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', taskRoutes);

mongoose

  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log('MongoDB connecté');

    app.listen(3000, () => {

      console.log('Serveur lancé sur http://localhost:3000');

    });

  })

  .catch((error) => {

    console.error('Erreur connexion MongoDB :', error);

  });
 