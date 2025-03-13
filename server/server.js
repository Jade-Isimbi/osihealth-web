const express = require("express");
const app = express();
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PORT = 3004;

const SECRET_KEY = process.env.JWT_SECRET;
const USERS_FILE = "./users.json";

app.use(express.json());

const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return data ? JSON.parse(data) : [];
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    return res.status(400).json({ message: "Fill out all fields" });

  let users = readUsers();

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, name, password: hashedPassword };
  users.push(newUser);

  writeUsers(users);
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, name, password } = req.body;
  let users = readUsers();

  const user = users.find((user) => user.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
