//when ever we interact with monogodb we will always get promis 
//to do this we added async to all our function
//after this we need to add try catch block to all our functions but there is better way to do this
//which is express aysnch handler which will handle our exceptions inside express routes and
//it will pass them to express error handler
//install express-async-handler

//desc for get all contacts
//route /api/contacts
//access will be private
const asyncHandler = require("express-async-handler");
const Contact = require("../Models/ContactModel")
const constants = require("../routes/Constants");

//wrap the function in this asyncHandler
//this will do automatic try catch exception handling
const getContacts =asyncHandler(async (req,res)=>{
    const contacts =await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
})

const seachByNumber = asyncHandler(async(req,res)=>{
    const{phone} = req.body;
    console.log(phone);
    const contact =await Contact.findOne({phone})
    console.log(contact);
    if(!contact){
        res.status(400).send({message:`Contact with ${phone} not found`})
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(400).send({message :`The current user does not have access to this contact`})
    }
    res.status(200).json(contact);    
})

const searchByEmail = asyncHandler(async (req, res)=>{
    const{email} = req.body;
    console.log(email)
    const contact =await Contact.findOne({email})
    if(!contact){
        res.status(400).send({message:`Contact with ${email} not found`})
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(400).send({message :`The current user does not have access to this contact`})
    }
    res.status(200).json(contact);  
})


//desc for get single contact
//route /api/contacts/:id
//for now access will be private

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
        phone,
        user_id :req.user.id,
    }); 
    res.status(201).json(contact)
})

//desc for update single contact
//route /api/contacts/:id
//for now access will be private

const updateContact =asyncHandler(async (req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("USer don't have permission to update this contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updatedContact)
})

// desc  search by name of contact
// route /api/contacts/name
// access will be private

const searchByName=asyncHandler(async (req, res)=>{
   
    const {name} = req.body;
    // console.log(name)
    
    const contact = await Contact.findOne({name: name})//req.params.name
   
    console.log(contact)
    if(!contact){
        console.log("first if block")
        res.status(400).send({message:"Contact not found"})
    }
    if(contact.user._id.toString() !== req.user.id){
        console.log("second if block")
        res.status(403).send({message:"User don't have permission to access this contacts"});
    }
    
    res.status(200).json(contact);
})

//desc for delete single contact
//route /api/contacts/:id
//for now access will be private
const deleteContact =asyncHandler( async(req,res)=>{
    console.log("the delete method")
    const contact =await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to delete this contacts");
    }   
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json({message:`Delete contact with ${contact.name} id`})
})


module.exports={
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
    searchByName,
    seachByNumber,
    searchByEmail
    }