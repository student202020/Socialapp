const router = require("express").Router()
const Post = require("../models/Posts")
const User = require("../models/Users")
const bcrypt = require("bcrypt")

//CREATE

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
  
  } catch (err) {
    res.status(500).json("neka greska");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userID === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL
router.get("/", async (req, res) => {
   
       try{
        const post = await Post.find()
        res.status(200).json(post)
       }catch(err){res.status(500).json(err)}
})
//GET FRIENDS POSTS

router.get("/:id/friends", async (req, res) => {
   
    try{
     const user = await User.findById(req.params.id)
     const userPosts = await Post.find({userID: req.params.id})
     const friendPosts = await Promise.all(
     user.followings.map((item) => {
            return Post.find({userID: item})
        })
     )
     res.status(200).json(userPosts.concat(...friendPosts));
    }catch(err){res.status(500).json(err)}
})

//GET ONE
router.get("/:id", async (req, res) => {
   
    try{
     const post = await Post.findById(req.params.id)
     res.status(200).json(post)
    }catch(err){res.status(500).json(err)}
})


//GET FROM ONE USER
router.get("/:id", async (req, res) => {
   
    try{
     const post = await Post.findOne(req.params.id)
     const postS = await Post.findMany({userID: this.post.userID})

     res.status(200).json(postMessage)
    }catch(err){res.status(500).json(err)}
})

//LIKE POSST
router.put("/likes/:id", async(req, res) => {
    try{
      const post = await Post.findById(req.params.id)
      if(req.body.userId !== post.userID){
        if (!post.likes.includes(req.body.userId)){
        const updatedPost = await post.updateOne({$push:{likes:req.body.userId}})
   
         }else{
        const updatedPost = await post.updateOne({$pull:{likes:req.body.userId}})
    
      }
      }else{res.status(500).json("You cant like yout own post")}

    }catch(err){res.status(500).json(err)}
})



module.exports = router