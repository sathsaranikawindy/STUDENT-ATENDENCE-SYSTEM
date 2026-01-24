const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const DATA_FILE = "./data.json";

/* ---------- data.json file check ---------- */
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({ students: [], attendance: [] }, null, 2)
  );
}

/* ---------- helper functions ---------- */
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/* ---------- HOME ROUTE (IMPORTANT) ---------- */
app.get("/", (req, res) => {
  res.send("Student Attendance Backend is Running ✅");
});

/* ---------- ADD STUDENT ---------- */
app.post("/add-student", (req, res) => {
  const data = readData();
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Student name required" });
  }

  data.students.push({ id: Date.now(), name });
  writeData(data);

  res.json({ message: "Student added successfully" });
});

/* ---------- GET STUDENTS ---------- */
app.get("/students", (req, res) => {
  const data = readData();
  res.json(data.students);
});

/* ---------- MARK ATTENDANCE ---------- */
app.post("/attendance", (req, res) => {
  const data = readData();
  const { studentId, date, status } = req.body;

  data.attendance.push({ studentId, date, status });
  writeData(data);

  res.json({ message: "Attendance marked" });
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
