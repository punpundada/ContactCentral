const mongoos = require("mongoose")

const userSchema = mongoos.Schema(
    {
        username:{
            type:String,
            required:[true, "Please add the user name"]
        },
        email:{
            type:String,
            required:[true,"Please add email address of user"],
            unique:[true, "The email address already taken"]
        },
        password:{
            type:String,
            required:[true, "Please add a password"]
        }
    },
    {
        timestamps:true,
    }
)

module.exports=mongoos.model("User",userSchema);