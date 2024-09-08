const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express();

app.use(express.json());

const port = 3000;
app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/api/products',async(req,res)=>{
    try {
      const product = await Product.find({});
      res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/products', async(req,res)=>{
   try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
   } catch (error) {
    res.status(500).json({message: error.message});
   }
});


mongoose.connect("mongodb+srv://sihina:sihina2276@mongocrud.v1y9r.mongodb.net/?retryWrites=true&w=majority&appName=MongoCRUD").then(()=>{
    console.log("Connect to the Database....!!");
    app.listen(port,()=>{
        console.log(`Server is Running port ${port}`);
    });
}).catch(()=>{
    console.log("Connection Fail");
})

