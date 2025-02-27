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
  return AccountModel.LogoutAccount().then((response) => {
    return response
  });
}

function isAuth() {
  const auth = AccountModel.checkAuth();
  if (auth != null) {
    return { isLoggedIn: true, userToken: auth };
  } else {
    return { isLoggedIn: false };
  }
}

function GetAccountController() {
  return AccountModel.getUserAccount();
}

function UpdateAccountController(info) {
  return AccountModel.updateUserAccount(info);
}

module.exports = {
  RegisterController,
  LoginController,
  LogoutController,
  isAuth,
  GetAccountController,
  UpdateAccountController,
};
