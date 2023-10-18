const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

// BrandStore-server 
// YBZ9sxtxYaTXxcEf 


const uri = "mongodb+srv://BrandStore-server:YBZ9sxtxYaTXxcEf@cluster0.fobkzbd.mongodb.net/?retryWrites=true&w=majority";

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


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close(); 
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Crud is running....')
});

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});