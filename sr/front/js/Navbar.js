fetch("Navbar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar").innerHTML = data;
      })
      .catch(error => console.error('Không thể tải Navbar:', error));

// Gọi hàm khi trang được tải
document.addEventListener("DOMContentLoaded", checkLoginStatus)

// Kiểm tra trạng thái đăng nhập
async function checkLoginStatus() {
  try {
    console.log("Checking login status...")
    const response = await fetch('http://localhost:8081/api/is-auth');
    const data = await response.json();

    const infoItem = document.getElementById('infoItem');
    const loginItem = document.getElementById('loginItem');
    const registerItem = document.getElementById('registerItem');
    const logoutItem = document.getElementById('logoutItem');
    const homeLogin = document.getElementById("homeLogin");

    if (data.isLoggedIn) {
        // Nếu đã đăng nhập, ẩn "Đăng nhập" và "Đăng ký", hiện "Đăng xuất"
        console.log("User is logged in")
        infoItem.style.display = 'block';
        loginItem.style.display = 'none';
        registerItem.style.display = 'none';
        logoutItem.style.display = 'block';
        homeLogin.style.display = "none";
      } else {
        // Nếu chưa đăng nhập, hiện "Đăng nhập" và "Đăng ký", ẩn "Đăng xuất"
        console.log("User is not logged in")
        infoItem.style.display = 'none';
        loginItem.style.display = 'block';
        registerItem.style.display = 'block';
        logoutItem.style.display = 'none';
    }
  } catch (error) {
      console.error('Error checking auth status:', error);
  }
}

async function logout() {
  try {
    console.log("Logging out...");
    const response = await fetch("http://localhost:8081/api/logout");
    const data = await response.json();

    if (data.isLoggedOut == true) {
      window.location.reload();
    }
    alert(data.message)
  } catch (error) {
    console.error("Error checking auth status:", error);
  }
}
