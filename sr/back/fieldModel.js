const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
  {
    FieldID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
    images: {
      type: [String], // Lưu danh sách URL ảnh
      required: false,
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

module.exports = mongoose.model("Field", fieldSchema);
