const Booking = require("./bookingModel");
const Field = require("./fieldModel");
const User = require("./userModel");

// Lấy tất cả các đơn đặt sân
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("UserID", "name email")
      .populate("FieldID", "name location");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đặt sân", error: error.message });
  }
};

// Lấy thông tin chi tiết của một đơn đặt sân
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("UserID", "name email")
      .populate("FieldID", "name location");

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đơn đặt sân" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin đặt sân", error: error.message });
  }
};

// Tạo đơn đặt sân mới
exports.createBooking = async (req, res) => {
  const { BookingDate, StartTime, EndTime, TotalPrice, UserID, FieldID } = req.body;

  try {
    const field = await Field.findById(FieldID);

    if (!field || field.status === "booked") {
      return res.status(400).json({ message: "Sân không khả dụng" });
    }

    const booking = new Booking({
      BookingDate,
      StartTime,
      EndTime,
      TotalPrice,
      UserID,
      FieldID,
    });

    await booking.save();

    // Cập nhật trạng thái sân
    field.status = "booked";
    await field.save();

    res.status(201).json({ message: "Đặt sân thành công", booking });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đặt sân", error: error.message });
  }
};

// Hủy đơn đặt sân
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đơn đặt sân để hủy" });
    }

    const field = await Field.findById(booking.FieldID);

    // Xóa đơn đặt sân
    await booking.remove();

    // Cập nhật trạng thái sân
    if (field) {
      field.status = "available";
      await field.save();
    }

    res.status(200).json({ message: "Hủy đặt sân thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi hủy đặt sân", error: error.message });
  }
};

// Cập nhật thông tin đơn đặt sân
exports.updateBooking = async (req, res) => {
  try {
    const { StartTime, EndTime, TotalPrice } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { StartTime, EndTime, TotalPrice },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đơn đặt sân để cập nhật" });
    }

    res.status(200).json({ message: "Cập nhật đơn đặt sân thành công", booking });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật đặt sân", error: error.message });
  }
};
