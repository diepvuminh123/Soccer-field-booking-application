const { MongoClient, ServerApiVersion } = require("mongodb");
const dbkey = require("./dbkey.json").key;

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

    const newUser = await userCol.insertOne(userAuth);
    console.log("Created a user");

    // Return user ID (.toString() to get string)
    return newUser.insertedId;
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

    const updateStatus = { $set: { isLogin: true } };
    const loginUser = await userCol.updateOne(credential, updateStatus);

    if (loginUser.matchedCount != 0) {
      console.log("Found User! Logged in");
      // Return user ID (.toString() to get string)
      const userInfo = await userCol.findOne(credential);
      return userInfo._id;
    } else {
      console.log("User not found");
      return null;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function LogoutAccount(id) {
  try {
    // Wait for connection to database first
    await client.connect();
    // Get the whole database object
    const db = client.db("Soccer_Field_App_DB");
    // Get the collection before query
    const userCol = db.collection("User");

    const updateStatus = { $set: { isLogin: false } };
    const logoutUser = await userCol.updateOne({ _id: id }, updateStatus);

    if (logoutUser.modifiedCount == 1) {
      console.log("Found User! Logging out...");
    } else {
      console.log("User not found or already logout");
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
};
