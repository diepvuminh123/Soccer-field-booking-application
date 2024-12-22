const AccountModel = require("./AccountModel.js");
const ObjectId = require("mongodb").ObjectId;

function RegisterController(name, email, password, phone) {
  const userInfo = {
    name: name,
    role: "customer",
    phone: phone,
    email: email,
    password: password,
    isLogin: true,
  };
  AccountModel.RegisterAccount(userInfo).then((userID) => {
    console.log(userID.toString());
  });
}

function LoginController(email, password) {
  AccountModel.LoginAccount((credential = { email, password })).then(
    (userID) => {
      console.log(userID.toString());
    }
  );
}

function LogoutController(id) {
  AccountModel.LogoutAccount(id);
}

// RegisterController("Nguyen Van A", "abc@gmail.com", "abc123", "0123456789");
// LoginController("abc@gmail.com", "abc123");
// LogoutController(new ObjectId("67681bd8c133f7dde7ec88eb"));
