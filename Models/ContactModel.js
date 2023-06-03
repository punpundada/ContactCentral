const mongoos = require("mongoose")
const contactSchema=mongoos.Schema({
    user_id:{
        type:mongoos.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
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
    timestamps:true,
}
)

module.exports=mongoos.model("Contact",contactSchema )