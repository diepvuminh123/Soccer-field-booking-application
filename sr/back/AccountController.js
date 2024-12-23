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
  return AccountModel.RegisterAccount(userInfo).then((response) => {
    if (response.ack == true) {
      return LoginController(email, password);
    } else {
      return response;
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

module.exports = {
  RegisterController,
  LoginController,
  LogoutController,
  isAuth,
};
