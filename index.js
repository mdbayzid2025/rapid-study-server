// ========================
// 🌐 Imports & Config
// ========================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

// ========================
// 📦 App Initialization
// ========================
const app = express();
const port = process.env.port || 5000;

// ========================
// 🧩 Utilities & Database
// ========================
const connectDatabase = require("./utility/connectData");

// ========================
// 🛠️ Routes
// ========================

const teacherRouter = require("./Routes/teacherRouter");
const semesterRoutes = require("./modules/Semester/semesterRoute");
const subjectRoutes = require("./modules/Subject/subjectRoutes");
const noteRouter = require("./modules/Notes/noteRoute");
const todosRouter = require("./modules/Todo/todosRoutes");
const eventRouter = require("./modules/Events/eventRoute");
const assignmentRouter = require("./modules/Assignment/assignmentRoutes");
const calendarRoutes = require("./modules/Calander/calenderRouter");
const notificationRouter = require("./modules/Notification/notificationRoute");
const { socketHelper } = require("./helper/socketHelper");
const { sendNotifications } = require("./helper/notificationHelper");
const Notification = require("./Schema/NotificationSchema");
const QueryBuilder = require("./utility/QueryBuilder");
const noticeRouter = require("./modules/Notice/noticeRoute");
const { AuthRoutes } = require("./modules/Auth/auth.route");

// ========================
// ⚙️ Middlewares
// ========================
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://10.10.7.102:3000",
      "http://localhost:3000",
      "https://rapid-study.vercel.app",
    ],
    credentials: true,
  })
);

// ========================
// 🗄️ Database Connection
// ========================
connectDatabase().catch((err) => console.log(err.message));

// ========================
// 🚦 API Routes
// ========================
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/semesters", semesterRoutes);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/calendar", calendarRoutes);
app.use("/api/v1/notice", noticeRouter);

// ========================
// 🏠 Root Endpoint
// ========================
app.get("/", (req, res) => {
  res.send("Hello from Express + Cloudinary");
});

app.get("/notify", async (req, res) => {
  const data = await Notification.find().lean();

  sendNotifications({
    title: "Add new notes",
    message: `Add new note of has been published by ${data?.length + 1}.`,
    // receiver: follower.followerId,
    receiver: "68dcfbd20fa1a936d5ce1c39",
    type: "Class Test",
    read: false,
    // reference: payload._id
    reference: "68dcfbd20fa1a936d5ce1c39",
  });

  const notificationQueryBuilder = new QueryBuilder(
    Notification.find()
  ).paginate();
  // const result = await Notification.find();

  const notifications = await notificationQueryBuilder.modelQuery;
  const meta = await notificationQueryBuilder.getPaginationInfo();

  return res.json({
    status: 200,
    message: "Add notfification success",
    data: notifications,
    meta,
  });
});

// ========================
// 📁 Static Files
// ========================
// app.use(express.static(path.join(__dirname, "public")));
app.use("/upload", express.static(path.join(__dirname, "public/upload")));

// ========================
// 🚀 Start Server
// ========================
const server = app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

// ========================
// 🔌 Socket.io Setup
// ========================
const io = new Server(server, {
  pingTimeout: 6000,
  cors: {
    origin: [
      "http://10.10.7.102:3000",
      "http://localhost:3000",
      "https://rapid-study.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true, // optional but useful if cookies/auth are used
  },
});

socketHelper.socket(io);
global.io = io;

// socketHandler.on("connection", () => {
//   console.log("⚡ Client connected");
// });
