import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://toch:bp3n9ByJByAp2vWR@cluster0.ioute2w.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const adminDb = client.db("admin");
    
    // Fetch the list of databases
    const databasesList = await adminDb.admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(`- ${db.name}`));

    console.log("Connected successfully!");
  } finally {
    await client.close();
  }
}

run().catch(console.error);
