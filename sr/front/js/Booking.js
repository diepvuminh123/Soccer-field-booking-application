document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Lấy giá trị 
    const name = document.getElementById('name').value;
    const fieldName = document.getElementById('field-name').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const date = document.getElementById('date').value;

})