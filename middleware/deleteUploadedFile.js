const fs = require("fs");
const path = require("path");

// ডিলিট করার ফাংশন
const deleteFile = (fileUrl) => {
  if (!fileUrl) return;

  const filePath = path.join(__dirname, "../public", fileUrl.replace(`${process.env.BASE_URL}`, ""));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // ফাইল মুছে ফেলো
  }
};


module.exports = deleteFile;