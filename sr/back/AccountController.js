const AccountModel = require("./AccountModel.js");

function RegisterController(name, email, password, phone, address) {
  const userInfo = {
    name: name,
    role: "customer",
    phone: phone,
    address: address,
    email: email,
    password: password,
  };
  return AccountModel.RegisterAccount(userInfo).then((ack) => {
    if (ack == true) {
      return LoginController(email, password);
    }
  });
}

function LoginController(email, password) {
  return AccountModel.LoginAccount({ email, password }).then((user) => {
      if (user) {
        console.log("Logged in!")
        return true
      } else return false;
  });
}

function LogoutController() {
  AccountModel.LogoutAccount();
}

function isAuth() {
  const auth = AccountModel.checkAuth();
  if (auth != null) {
    console.log(auth);
    return true;
  } else {
    return false;
  }
}
// RegisterController("Nguyen Van A", "abc@gmail.com", "abc123", "0123456789");
// LoginController("abc@gmail.com", "abc123");
// LogoutController();
// console.log(isAuth());

module.exports = {
  RegisterController,
  LoginController,
  LogoutController,
  isAuth,
};
