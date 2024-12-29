const Field = require("./fieldModel");

// Lấy tất cả các sân
exports.getAllFields = async (req, res) => {
  try {
    const fields = await Field.find();
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sân", error: error.message });
  }
};

// Lấy thông tin chi tiết của sân theo ID
exports.getFieldById = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    if (!field) {
      return res.status(404).json({ message: "Không tìm thấy sân" });
    }
    res.status(200).json(field);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin sân", error: error.message });
  }
};

// Thêm mới sân
exports.createField = async (req, res) => {
  try {
    const { FieldID, name, location, status, images } = req.body;

    const newField = new Field({
      FieldID,
      name,
      location,
      status,
      images,
    });

    await newField.save();
    res.status(201).json(newField);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sân mới", error: error.message });
  }
};

// Cập nhật thông tin sân
exports.updateField = async (req, res) => {
  try {
    const fieldId = req.params.id;
    const updates = req.body;

    const updatedField = await Field.findByIdAndUpdate(fieldId, updates, { new: true, runValidators: true });
    if (!updatedField) {
      return res.status(404).json({ message: "Không tìm thấy sân để cập nhật" });
    }

    res.status(200).json(updatedField);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sân", error: error.message });
  }
};

// Xóa sân
exports.deleteField = async (req, res) => {
  try {
    const fieldId = req.params.id;

    const deletedField = await Field.findByIdAndDelete(fieldId);
    if (!deletedField) {
      return res.status(404).json({ message: "Không tìm thấy sân để xóa" });
    }

    res.status(200).json({ message: "Đã xóa sân thành công", deletedField });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sân", error: error.message });
  }
};
