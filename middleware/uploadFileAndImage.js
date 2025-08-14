const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utility/cloudinary");

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

    return {
      folder,
      allowed_formats: allowedFormats,
      public_id: file.originalname.split(".")[0] // keep original name without extension
    };
  }
});

const upload = multer({ storage });

module.exports = upload;
