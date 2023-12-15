const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema(
    {

        username:{type:String, required:true, unique:true},
        name:{type:String, required:true},
        password:{type:String, required:true},
        city:{type:String, required:true},
        desc:{type:String, required:true},
        image:{type:String, default:" "},
        imagec:{type:String, default:" "},
        isAdmin:{type:String, default:false},
        followings:{type:Array, default:[]},
        followers:{type:Array, default:[]},
     },
     {timestamps: true}
     )

     module.exports = mongoose.model("Users", UsersSchema)