const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const brandCollection = client.db("brandDB").collection("brands");

    app.get("/brands", async(req, res) => {
      const result = await brandCollection.find().toArray();
      res.send(result);
    })

// get single data using id 
  app.get('/brands/:id', async(req, res) => {
     const id = req.params.id;
     const query = {_id : new ObjectId(id)};
     const result = await brandCollection.findOne(query);
     res.send(result);
  })
  // post data 
  app.post("/brands", async(req, res) => {
    const user = req.body; 
    const result = await brandCollection.insertOne(user);
    res.send(result);
  })
  
  app.put('/brands/:id', async(req, res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const options = { upsert: true };
    const updatedBrand = req.body;
    const brand = {
      $set: {
        img: updatedBrand.img,
        name: updatedBrand.name,
        brand_name: updatedBrand.brand_name,
        type: updatedBrand.type,
        price: updatedBrand.price,
        rating: updatedBrand.rating
      }
    };
    const result = await brandCollection.updateOne(filter, brand, options);
    res.send(result);
  })
// get user 
 

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