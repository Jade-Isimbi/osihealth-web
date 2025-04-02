const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ngrok = require("ngrok");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

const SECRET_KEY = process.env.JWT_SECRET;
const USERS_FILE = "./users.json";
const APPOINTMENTS_FILE = "./appointments.json";

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const readFile = (file) => {
  try {
    if (!fs.existsSync(file)) return [];
    const data = fs.readFileSync(file, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${file}:`, error);
    return [];
  }
};

const writeFile = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${file}:`, error);
  }
};

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password)
    return res.status(400).json({ message: "Fill out all fields" });

  let users = readFile(USERS_FILE);
  if (users.some((user) => user.email === email))
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, name, password: hashedPassword });

  writeFile(USERS_FILE, users);
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let users = readFile(USERS_FILE);

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

app.post("/appointments", async (req, res) => {
  const { name, email, phone, specialist, date, time, message } = req.body;

  if (!name || !email || !phone || !specialist || !date || !time || !message)
    return res.status(400).json({ message: "Fill out all fields" });

  let appointments = readFile(APPOINTMENTS_FILE);

  const conflict = appointments.some(
    (appointment) => appointment.date === date && appointment.time === time
  );

  if (conflict) {
    return res.status(409).json({
      message: "Appointment slot already booked. Choose another time.",
    });
  }

  const newAppointment = {
    name,
    email,
    phone,
    specialist,
    date,
    time,
    message,
  };
  appointments.push(newAppointment);

  writeFile(APPOINTMENTS_FILE, appointments);
  res.status(201).json({ message: "Appointment booked successfully!" });
});
app.get("/booking", async (req, res) => {
  try {
    let appointments = readFile(APPOINTMENTS_FILE);

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  try {
    const url = await ngrok.connect(PORT);
    console.log(`ngrok tunnel: ${url}`);
  } catch (error) {
    console.log("Error starting ngrok:", error.message);
  }
});
