// // utils/uploadUtils.js

// import {fileUploader }  from"./uploadFile";



// const uploadFileToCloudinary = async (file) => {
//   try {
//     if (!file) {
//       throw new Error("No file uploaded");
//     }

//     // Determine resource type (image, video, or raw for non-image/video)
//     let resourceType = file.mimetype.startsWith("image/") ? "image" :
//                        file.mimetype.startsWith("video/") ? "video" : "raw";

//     // Upload to Cloudinary using the fileUploader's reusable function
//     const cloudinaryResult = await fileUploader.uploadToCloudinary({
//       ...file,
//       resource_type: resourceType,
//       folder: resourceType === "raw" ? "documents" : "uploads",
//       use_filename: true,
//       unique_filename: true,
//       overwrite: true,
//     });

//     // Generate download URL with the correct filename
//     const originalName = file.originalname;  // Original file name (e.g., "file.pdf")
//     const downloadUrl = `${cloudinaryResult.secure_url}?attachment=${encodeURIComponent(originalName)}`;

//     return {
//       success: true,
//       message: "File uploaded successfully",
//       data: {
//         url: downloadUrl,
//         public_id: cloudinaryResult.public_id,
//         resource_type: cloudinaryResult.resource_type,
//       },
//     };
//   } catch (error) {
//     console.error("Upload failed:", error);
//     throw new Error("Upload failed");
//   }
// };

// export { uploadFileToCloudinary };
