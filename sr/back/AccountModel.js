const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const key = require("./key.json");
const dbkey = key.dbkey;
const jwtKey = key.jwt_secret_key;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbkey, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function RegisterAccount(userAuth) {
  try {
    // Wait for connection to database first
    await client.connect();
    // Get the whole database object
    const db = client.db("Soccer_Field_App_DB");
    // Get the collection before query
    const userCol = db.collection("User");
    const email = userAuth.email
    const checkUser = await userCol.findOne({email});
    if (checkUser) {
      console.log("User already existed!")
      return { ack: false, response: "User already existed!"}
    }
    
    const newUser = await userCol.insertOne(userAuth);
    console.log("Created a user");

    return { ack: newUser.acknowledged }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function LoginAccount(credential) {
  try {
    // Wait for connection to database first
    await client.connect();
    // Get the whole database object
    const db = client.db("Soccer_Field_App_DB");
    // Get the collection before query
    const userCol = db.collection("User");

    const loginUser = await userCol.findOne(credential);

    if (loginUser != null) {
      console.log("Found User! Logging in...");
      const token = jwt.sign(
        { userID: loginUser._id, username: loginUser.email },
        jwtKey,
        {
          expiresIn: 3600, // 1h
        }
      );
      key.userToken = token;
      // Write token to key.json
      fs.writeFile("sr/back/key.json", JSON.stringify(key, null, 2), (err) => {
        if (err) throw err;
        console.log("Done writing token");
      });
    } else {
      console.log("User not found");
    }
    return loginUser;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function LogoutAccount() {
  key.userToken = null;
  // Write token to key.json
  fs.writeFile("sr/back/key.json", JSON.stringify(key, null, 2), (err) => {
    if (err) throw err;
    console.log("Done remove current token");
  });
  return true;
}

function checkAuth() {
  try {
    const decoded = jwt.verify(key.userToken, jwtKey);
    return decoded;
  } catch (err) {
    console.log("Invalid or expired token");
    return null;
  }
}

function refreshToken() {
  const decoded = jwt.verify(key.userToken, jwtKey);
  const token = jwt.sign(
    { userID: decoded.userID, username: decoded.username },
    jwtKey,
    {
      expiresIn: 3600, // 1h
    }
  );
  key.userToken = token;
  // Write token to key.json
  fs.writeFile("sr/back/key.json", JSON.stringify(key, null, 2), (err) => {
    if (err) throw err;
    console.log("Done writing token");
  });
}

async function getUserAccount() {
  try {
    // Wait for connection to database first
    await client.connect();
    // Get the whole database object
    const db = client.db("Soccer_Field_App_DB");
    // Get the collection before query
    const userCol = db.collection("User");

    const currentUser = checkAuth();
    if (currentUser != null) {
      const userData = await userCol.findOne({
        _id: ObjectId.createFromHexString(currentUser.userID),
      });
      if (userData != null) {
        console.log("Found User! Returning data...");
      } else {
        console.log("User data not found");
      }
      return userData
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function updateUserAccount(info) {
  try {
    // Wait for connection to database first
    await client.connect();
    // Get the whole database object
    const db = client.db("Soccer_Field_App_DB");
    // Get the collection before query
    const userCol = db.collection("User");

    const currentUser = checkAuth();
    if (currentUser != null) {
      const filter = { _id: ObjectId.createFromHexString(currentUser.userID) };
      const updateDoc = {
        $set: info
      }
      const updateResult = await userCol.updateOne(filter, updateDoc);
      if (updateResult != null) {
        console.log("Found User! Updating data...");
      } else {
        console.log("User data not found");
      }
      return updateResult;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
  RegisterAccount,
  LoginAccount,
  LogoutAccount,
  checkAuth,
  getUserAccount,
  updateUserAccount,
};
