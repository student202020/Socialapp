const mongoose = require("mongoose")

const PostsSchema = new mongoose.Schema(
    {

        userID:{type:String, required:true},
        desc:{type:String, required:true},
        image:{type:String, default:" "},
        likes:{type:Array, default:[]},
     },
     {timestamps: true}
     )

     module.exports = mongoose.model("Posts", PostsSchema)