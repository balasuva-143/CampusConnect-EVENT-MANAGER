const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let events = [
  {
    id: 1,
    title: "AI Hackathon",
    category: "Hackathon",
    date: "15 October 2026",
    venue: "Main Auditorium",
    description:
      "Build innovative AI solutions and compete with talented engineering students.",
    status: "Registration Open"
  },
  {
    id: 2,
    title: "Web Development Workshop",
    category: "Workshop",
    date: "18 October 2026",
    venue: "IT Laboratory",
    description:
      "Learn modern web development using HTML, CSS, JavaScript and React.",
    status: "Registration Open"
  },
  {
    id: 3,
    title: "Coding Contest",
    category: "Competition",
    date: "22 October 2026",
    venue: "Programming Laboratory",
    description:
      "Test your programming, logical thinking and problem-solving skills.",
    status: "Registration Open"
  },
  {
    id: 4,
    title: "Project Expo",
    category: "Project Expo",
    date: "28 October 2026",
    venue: "College Seminar Hall",
    description:
      "Showcase innovative academic and real-world engineering projects.",
    status: "Registration Open"
  },
  {
    id: 5,
    title: "Technical Symposium",
    category: "Symposium",
    date: "2 November 2026",
    venue: "Mahendra College Campus",
    description:
      "Present technical ideas, attend expert sessions and connect with students.",
    status: "Registration Open"
  }
];

let registrations = [];

/* HOME */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusConnect Event Manager API is running"
  });
});

/* HEALTH */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working!"
  });
});

/* GET EVENTS */

app.get("/api/events", (req, res) => {
  res.json({
    success: true,
    events
  });
});

/* CREATE EVENT */

app.post("/api/events", (req, res) => {

  const {
    title,
    category,
    date,
    venue,
    description
  } = req.body;

  if (
    !title ||
    !category ||
    !date ||
    !venue ||
    !description
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all event details"
    });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    category,
    date,
    venue,
    description,
    status: "Registration Open"
  };

  events.push(newEvent);

  res.status(201).json({
    success: true,
    message: "Event created successfully!",
    event: newEvent
  });
});

/* REGISTER */

app.post("/api/register", (req, res) => {

  const {
    eventId,
    eventTitle,
    name,
    email,
    department,
    year,
    phone
  } = req.body;

  if (
    !name ||
    !email ||
    !department ||
    !year ||
    !phone
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields"
    });
  }

  const registration = {
    id: registrations.length + 1,
    eventId,
    eventTitle,
    name,
    email,
    department,
    year,
    phone,
    registeredAt: new Date().toISOString()
  };

  registrations.push(registration);

  console.log(
    "New Registration:",
    registration
  );

  res.json({
    success: true,
    message:
      `Successfully registered for ${eventTitle}!`,
    registration
  });
});

/* GET REGISTRATIONS */

app.get("/api/registrations", (req, res) => {

  res.json({
    success: true,
    registrations
  });

});

/* SERVER */

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Event Manager Server running on port ${PORT}`
    );
  }
);