const mongoos = require("mongoose")
const contactSchema=mongoos.Schema({
    name:{
        type:String,
        required:[true,"Please add the contact name"]
    },
    email:{
        type:String,
        required:[true,"Please add the contact email id"]
    },
    phone:{
        type:String,
        required:[true,"Please add the contact phone number"]
    },

},
{
    timestamp:true,
}
)

module.exports=mongoos.model("Contact",contactSchema )