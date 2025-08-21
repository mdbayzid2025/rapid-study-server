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
const cloudinary = require("cloudinary").v2;
const path = require("path");
const port = process.env.port || 5000;

const http = require('http');
const socketIo = require('socket.io');
const notificationRouter = require("./modules/Notification/notificationRoute");

const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: [
  "http://10.10.7.102:3000",
  "http://localhost:3000"
]
  , credentials: true }));

// Connect MongoDB
connectDatabase().catch((err) => console.log(err.message));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "uploads";
    let allowedFormats = [];

    if (file.mimetype.startsWith("image/")) {
      folder = "images";
      allowedFormats = ["jpg", "jpeg", "png", "webp"];
    } else {
      folder = "documents";
      allowedFormats = ["pdf", "doc", "docx", "ppt", "pptx"];
    }

    const result = {
      folder,
      allowed_formats: allowedFormats,
      public_id: file.originalname.split(".")[0], // keep original name
    };

    return result;
  },
});

const upload = multer({ storage });

// Upload route
app.post(
  "/api/upload",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "files", maxCount: 5 },
  ]),
  (req, res) => {
    try {
      console.log("req.files?.photo?.[0]", req.files?.photo?.[0]);

      // CloudinaryStorage returns the URL in 'path'
      const photo =
        req.files?.photo?.[0]?.path || req.files?.photo?.[0]?.filename || null;
      const docs =
        req.files?.files?.map((file) => file.path || file.filename) || [];

      res.json({
        success: true,
        message: "Files uploaded successfully",
        photo,
        docs,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

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
app.use('/api/v1/notifications', notificationRouter);


app.get("/", (req, res) => {
  res.send("Hello from Express + Cloudinary");
});

// Make everything inside /public accessible via URL
// app.use(express.static(path.join(__dirname, "public")));
app.use('/upload', express.static(path.join(__dirname, 'public/upload')));


// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
