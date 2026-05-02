const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API TaskFlow fonctionne 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));

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

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});