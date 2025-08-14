const express = require("express");
const upload = require("../middleware/uploadFileAndImage");


const uploadRoute = express.Router();

// Multiple fields (photo + docs)
uploadRoute.post(
  "/upload",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "files", maxCount: 5 }
  ]),
  (req, res) => {
    try {
      const photo = req.files?.photo?.[0]?.path || null;
      const docs = req.files?.files?.map(file => file.path) || [];

      res.json({
        success: true,
        message: "Files uploaded successfully",
        photo,
        docs
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = uploadRoute;
