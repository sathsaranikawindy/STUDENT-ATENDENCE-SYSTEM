const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* ---------- MongoDB Connect ---------- */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

/* ---------- Schemas ---------- */
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  date: String,
  status: String
});

const Student = mongoose.model("Student", studentSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);

/* ---------- HOME ---------- */
app.get("/", (req, res) => {
  res.send("Student Attendance Backend is Running ✅ (MongoDB)");
});

/* ---------- ADD STUDENT ---------- */
app.post("/add-student", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    await Student.create({ name });
    res.json({ message: "Student added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- GET STUDENTS ---------- */
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

/* ---------- MARK ATTENDANCE ---------- */
app.post("/attendance", async (req, res) => {
  const { studentId, date, status } = req.body;

  await Attendance.create({ studentId, date, status });
  res.json({ message: "Attendance marked" });
});
app.get("/attendance", async (req, res) => {
  const list = await Attendance.find().populate("studentId");
  res.json(list);
});

/* ---------- START ---------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
