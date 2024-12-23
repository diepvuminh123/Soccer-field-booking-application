const AccountModel = require("./AccountModel.js");

function RegisterController(name, email, password, phone) {
  const userInfo = {
    name: name,
    role: "customer",
    phone: phone,
    email: email,
    password: password,
  };
  AccountModel.RegisterAccount(userInfo).then((ack) => {
    if (ack == true) {
      LoginController(email, password);
    }
  });
}

function LoginController(email, password) {
  AccountModel.LoginAccount({ email, password }).then((user) => {
    console.dir(user);
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
