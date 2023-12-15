const router = require("express").Router()
const User = require("../models/Users")
const bcrypt = require("bcrypt")

//UPDATE
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id ){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.bocy.password = await bcrypt.hash(req.body.password, salt)
            }catch(err){res.status(500).json(err)}
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,
                {$set: req.body},
                {new:ture})
                const {password, ...other} = user._doc
                res.status(200).json(other)
         }catch(err){res.status(500).json(err)}

    }else{res.status(500).json("You are not authorised to do this action!")}
})

//DELETE
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id ){
      
        try{
             await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted")
         }catch(err){res.status(500).json(err)}

    }else{res.status(500).json("You are not authorised to do this action!")}
})

//GET ALL
router.get("/", async (req, res) => {
   
       try{
        const user = await User.find()
        res.status(200).json(user)
       }catch(err){res.status(500).json(err)}
})

//GET ONE
router.get("/:id", async (req, res) => {
   
    try{
     const user = await User.findById(req.params.id)
     res.status(200).json(user)
    }catch(err){res.status(500).json(err)}
})


//GET FRIENDS
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username } = friend;
        friendList.push({ _id, username});
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

//FOLLOW 
router.put("/follow/:id", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });
  

//UNFOLLOW 
router.put("/unfollow/:id", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });

module.exports = router