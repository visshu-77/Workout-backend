const express = require("express");
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

router.post(
  "/cloudinary",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "test-uploads",
        }
      );

      res.json({
        success: true,
        message: "Image uploaded to Cloudinary",
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error) {
      console.error("CLOUDINARY TEST ERROR:", error);
      res.status(500).json({
        success: false,
        message: "Cloudinary upload failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;
