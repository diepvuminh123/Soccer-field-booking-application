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

async function run() {
  try {
    // Wait for connection to database first
    await client.connect();
    // Get the whole database object
    const db = client.db("Soccer_Field_App_DB");
    // Get the collection before query
    const field = db.collection("Field");

    await field.insertOne({ name: "Phu Tho", location: "LTK" });
    console.log("A document was inserted");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
