//when ever we interact with monogodb we will always get promis 
//to do this we added async to all our function
//after this we need to add try catch block to all our functions but there is better way to do this
//which is express aysnch handler which will handle our exceptions inside express routes and
//it will pass them to express error handler
//install express-async-handler

//desc for get all contacts
//route /api/contacts
//for now access will be public
const asyncHandler = require("express-async-handler");
const Contact = require("../Models/ContactModel")
const constants = require("../routes/Constants");

//wrap the function is this asyncHandler
//this will do automatic try catch exception handling
const getContacts =asyncHandler(async (req,res)=>{
    const contacts =await Contact.find();
    res.status(200).json(contacts)
})

//desc for get single contact
//route /api/contacts/:id
//for now access will be public

const getContact =asyncHandler(async (req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//desc for post create single contact
//route /api/contacts
//This route will be private 

const createContact =asyncHandler(async (req, res)=>{
    console.log("The req body is : ",req.body);
    //but when we send empty body it will still accept it 
    //thats why we need to do error handling
    const {name , phone , email}= req.body;
    if(!name || ! phone || ! email){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    //but this error message is not in json format so we need to create custom middleware 
    const contact =await Contact.create({
        name,
        email,
        phone
    }); 
    res.status(201).json(contact)
})

//desc for update single contact
//route /api/contacts/:id
//for now access will be public

const updateContact =asyncHandler(async (req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updatedContact)
})

//desc for delete single contact
//route /api/contacts/:id
//for now access will be public
const deleteContact =asyncHandler( async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    await Contact.deleteOne(contact)
    res.status(200).json({message:`Delete contact with ${req.params.id} id`})
})


module.exports={getContacts,getContact,createContact,updateContact,deleteContact}