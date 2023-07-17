const express = require('express');
var cors = require('cors')
const Connectdb = require("./Config/dbConnection")
const { errorHandler } = require('./Controllers/Middleware/ErrorHandler');
const app=express();
const port=process.env.PORT ||3001 
const dotenv = require('dotenv').config();
app.use(cors())
Connectdb();

//to parse all data objects in json we need to use a middleware provided by express
app.use(express.json())
app.use("/api/contacts", require("./routes/ContactRoute"))
app.use("/api/users", require("./routes/UserRoute"))

app.use(errorHandler)



app.listen(port, ()=>{
    console.log(`The server is running on http://localhost:${port}`)
})
