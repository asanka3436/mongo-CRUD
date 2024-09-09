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


app.get('/api/products/:id', async (req,res)=>{
    
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


app.post('/api/products', async(req,res)=>{
   try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
   } catch (error) {
    res.status(500).json({message: error.message});
   }
});


// update API
app.put('/api/products/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);

        if(!product){
            return res.status(404).json({})
        }
        res.status(200).json(product);
    } catch (error) {
        
    }
});


// app.put('/api/products/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  
//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }
  
//       res.status(200).json(product);
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error });
//     }
//   });


//Delete API

app.delete('/api/products/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
})
  

mongoose.connect("mongodb+srv://sihina:sihina2276@mongocrud.v1y9r.mongodb.net/?retryWrites=true&w=majority&appName=MongoCRUD").then(()=>{
    console.log("Connect to the Database....!!");
    app.listen(port,()=>{
        console.log(`Server is Running port ${port}`);
    });

}).catch(()=>{
    console.log("Connection Fail");
})

