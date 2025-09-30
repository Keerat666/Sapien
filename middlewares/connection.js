const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // Load .env variables

// Make sure the environment variable exists
const uri = process.env.mongoPath;

if (!uri) {
  console.error("Error: MONGO URI not found in environment variables!");
  process.exit(1); // Exit if no URI is provided
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

run();
