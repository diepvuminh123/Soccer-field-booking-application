document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Lấy giá trị 
    const fieldName = document.getElementById('field-name').value;
    const fieldLoc = document.getElementById('field-location').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const date = document.getElementById('date').value;

    if (startTime >= endTime) {
        alert('Thời gian bắt đầu phải sớm hơn thời gian kết thúc!');
        return;
    }

    // Display success message
    document.getElementById('message').textContent = 'Đặt sân thành công!';
});