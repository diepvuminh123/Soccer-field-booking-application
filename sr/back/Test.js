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
    // Get the whole database object
    const database = client.db("sample_mflix");
    // Get the collection before query
    const comments = database.collection("theaters");

    // Execute the query returned a cursor
    const dataCursor = comments.find({ theaterId: 1000 });

    for await (const data of dataCursor) {
      console.dir(data);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
