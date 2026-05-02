const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API TaskFlow fonctionne 🚀");
});

// Routes MongoDB désactivées temporairement pour Render
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/tasks", require("./routes/taskRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Utilisateur connecté :", socket.id);

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté :", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});