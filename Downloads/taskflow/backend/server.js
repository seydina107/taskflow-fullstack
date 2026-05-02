const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // ✅ d'abord

const app = express();

// Middleware JSON
app.use(express.json());

// Connexion MongoDB
//connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

// ✅ ENSUITE on définit PORT
const PORT = process.env.PORT || 5000;

// Lancement serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});