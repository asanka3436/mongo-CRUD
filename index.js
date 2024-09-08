const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 3000;
app.get('/', function (req, res) {
  res.send('Hello World')
})



mongoose.connect("mongodb+srv://sihina:sihina2276@mongocrud.v1y9r.mongodb.net/?retryWrites=true&w=majority&appName=MongoCRUD").then(()=>{
    console.log("Connect to the Database....!!");
    app.listen(port,()=>{
        console.log(`Server is Running port ${port}`);
    });
}).catch(()=>{
    console.log("Connection Fail");
})

