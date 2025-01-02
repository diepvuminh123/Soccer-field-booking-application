// Định nghĩa giá tiền cho từng loại sân
const fieldPrices = {
    "Sân 5 người": 300000,
    "Sân 7 người": 500000,
    "Sân 11 người": 1000000,
};
// test
const bookings = [
    { date: "2025-01-02", time: "15:00", field: "Sân 5 người", customer: "Nguyễn Văn A", status: "Đã xác nhận" },
    { date: "2025-01-03", time: "18:00", field: "Sân 7 người", customer: "Trần Thị B", status: "Chưa xác nhận" },
    { date: "2025-01-04", time: "19:00", field: "Sân 11 người", customer: "Phạm Văn C", status: "Đã xác nhận" },
];

// load booking request
function loadBookingRequests() {
    const bookingRequestsList = document.getElementById("booking-requests-list");
    bookingRequestsList.innerHTML = "";

    // test
    const bookingRequests = [
        { date: "2025-01-02", time: "15:00-16:00", field: "Sân 5 người", customer: "Nguyễn Văn A", status: "Đã xác nhận" },
        { date: "2025-01-03", time: "18:00-19:00", field: "Sân 7 người", customer: "Trần Thị B", status: "Chưa xác nhận" },
        { date: "2025-01-04", time: "19:00-20:00", field: "Sân 11 người", customer: "Phạm Văn C", status: "Đã xác nhận" },
    ];

    bookingRequests.forEach(bookingRequest => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${bookingRequest.date}</td>
            <td>${bookingRequest.time}</td>
            <td>${bookingRequest.field}</td>
            <td>${bookingRequest.customer}</td>
            <td>${bookingRequest.status}</td>
            <td>
                <button class="btn btn-success confirm-btn" data-date="${bookingRequest.date}" data-time="${bookingRequest.time}" data-field="${bookingRequest.field}" data-customer="${bookingRequest.customer}">Xác Nhận</button>
                <button class="btn btn-danger cancel-btn" data-date="${bookingRequest.date}" data-time="${bookingRequest.time}" data-field="${bookingRequest.field}" data-customer="${bookingRequest.customer}">Từ Chối</button>
            </td>
        `;
        bookingRequestsList.appendChild(row);
    });

    // click click xác nhận
    const confirmBtns = document.querySelectorAll(".confirm-btn");
    confirmBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const date = btn.getAttribute("data-date");
            const time = btn.getAttribute("data-time");
            const field = btn.getAttribute("data-field");
            const customer = btn.getAttribute("data-customer");

            // add data to Booking List
            addBookingToList(date, time, field, customer);
            //cập nhật tiền nong
            const newBooking = { date, time, field, customer, status: "Đã xác nhận" };
            bookings.push(newBooking);
            loadBookings();
            //delete data when done
            const row = btn.parentNode.parentNode;
            row.remove();
        });
    });

    // click click từ chối
    const cancelBtns = document.querySelectorAll(".cancel-btn");
    cancelBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // remove
            const row = btn.parentNode.parentNode;
            row.remove();
        });
    });
}

// Thêm hàm thêm dữ liệu vào bảng Booking List
function addBookingToList(date, time, field, customer) {
    const bookingList = document.getElementById("booking-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${date}</td>
        <td>${time}</td>
        <td>${field}</td>
        <td>${customer}</td>
        <td>Đã xác nhận</td>
    `;
    bookingList.appendChild(row);
}

// Gọi hàm khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    loadBookings();
    loadBookingRequests();
});
//tính tiền
function calculateRevenue(bookings) {
    let totalRevenue = 0;
    bookings.forEach(booking => {
        if (booking.status === "Đã xác nhận") {
            totalRevenue += fieldPrices[booking.field] || 0;
        }
    });
    return totalRevenue;
}
// Hàm hiển thị danh sách lịch đặt
function loadBookings() {
    const bookingList = document.getElementById("booking-list");
    bookingList.innerHTML = "";

    let totalRevenue = 0;

    bookings.forEach(booking => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>${booking.field}</td>
            <td>${booking.customer}</td>
            <td>${booking.status}</td>
        `;
        bookingList.appendChild(row);
 totalRevenue = calculateRevenue(bookings);
       
    });

    document.getElementById("total-bookings").textContent = bookings.length;
    document.getElementById("total-revenue").textContent = totalRevenue.toLocaleString();
}

// import report
function generateReport() {
    const message = "Báo cáo doanh thu đã được xuất thành công!";
    document.getElementById("report-message").textContent = message;
}



