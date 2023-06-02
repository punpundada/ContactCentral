const express = require('express');
const Connectdb = require("./Config/dbConnection")
const { errorHandler } = require('./Controllers/Middleware/ErrorHandler');
const app=express();
const port=process.env.PORT ||3000 
const dotenv = require('dotenv').config();

Connectdb();
//to parse all data objects in json we need to use a middleware provided by express
app.use(express.json())
app.use("/api/contacts", require("./routes/ContactRoute"))
app.use("/api/users", require("./routes/UserRoute"))

app.use(errorHandler)



app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
})
