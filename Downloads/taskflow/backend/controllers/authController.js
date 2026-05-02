const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [];

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1d" }
  );
};

// Inscription
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: "Cet email existe déjà" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser)
  });
};

// Connexion
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user)
  });
};

// Profil utilisateur
const getMe = (req, res) => {
  res.json({
    message: "Profil utilisateur connecté",
    user: req.user
  });
};

module.exports = {
  register,
  login,
  getMe
};