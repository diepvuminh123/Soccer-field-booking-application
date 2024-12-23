const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8081;

const AccountController = require("./AccountController.js")

app.use(express.json())
app.use(cors())

app.post("/api/register", (req, res) => {
    const userInfo = req.body;
    AccountController.RegisterController(userInfo.name, userInfo.email, userInfo.password, userInfo.phone, userInfo.address)
    .then((response) => {
        if (response == true) {
          res.status(201).json({
            message: "Register Account Success",
          });
        } else {
          res.status(400).json({
            message: response.response,
          });
        }
    });
})

app.post("/api/login", async (req, res) => {
    const userInfo = req.body;
    AccountController.LoginController(userInfo.email, userInfo.password).then((login) => {
        if (login == true) {
            res.status(201).json({
                message: "Login Success"
            });
        } else {
            res.status(400).json({
                message: "Wrong credential",
            });
        }
    })
})

app.get("/api/auth", (req, res) => {
    AccountController.isAuth().then((status) => {
        if (status == true) {
          res.status(201).json({
            message: "User currently authenticated",
          });
        }
    });
})

// Lắng nghe yêu cầu tại cổng
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
