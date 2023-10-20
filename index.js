const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

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
        // await client.connect();

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

// add to cart 
     const cartCollection = client.db("brandDB").collection("carts");

app.get('/carts', async(req, res) => {
  const cursor = cartCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})

// app.get('/myCart/:email', async(req,res) => {
//   const userEmail = req.params.email;
//   console.log(userEmail)
//   const query = {email: userEmail};
//   const result =await cartCollection.find(query).toArray();
// console.log(result)
//   res.send(result)
// })

app.post('/carts', async(req, res) => {
  const details = req.body;
  const result = await cartCollection.insertOne(details);
  res.send(result);
})

app.delete('/carts/:id', async(req, res) => {
  const id = req.params.id;
  console.log(id)
  const query = {
    _id : new ObjectId(id),
};
  console.log(query);
  const result = await cartCollection.deleteOne(query);
  console.log(result);
  res.send(result);

  
})
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