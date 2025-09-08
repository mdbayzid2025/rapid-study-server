const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const connectDatabase = require("./utility/connectData");
const authRouter = require("./Routes/authRouter");
const teacherRouter = require("./Routes/teacherRouter");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const semesterRoutes = require("./modules/Semester/semesterRoute");
const subjectRoutes = require("./modules/Subject/subjectRoutes");
const noteRouter = require("./modules/Notes/noteRoute");
const todosRouter = require("./modules/Todo/todosRoutes");
const eventRouter = require("./modules/Events/eventRoute");
const assignmentRouter = require("./modules/Assignment/assignmentRoutes");
const calendarRoutes = require("./modules/Calander/calenderRouter");
const notificationRouter = require("./modules/Notification/notificationRoute");

const socketIo = require("socket.io");

const path = require("path");
const port = process.env.port || 5000;

const http = require("http");

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://10.10.7.102:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", socket => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});



// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://10.10.7.102:3000", "http://localhost:3000", "https://rapid-study.vercel.app"],
    credentials: true,
  })
);

// Connect MongoDB
connectDatabase().catch((err) => console.log(err.message));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/teachers", teacherRouter);
// Use Semester routes

app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/semesters", semesterRoutes);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/calendar", calendarRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express + Cloudinary");
});

// Make everything inside /public accessible via URL
// app.use(express.static(path.join(__dirname, "public")));
app.use("/upload", express.static(path.join(__dirname, "public/upload")));

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
