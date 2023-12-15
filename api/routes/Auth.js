const router = require("express").Router()
const User = require("../models/Users")
const bcrypt = require("bcrypt")

//CREATE
router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({

            username:req.body.username,
            name:req.body.name,
            city:req.body.city,
            desc:req.body.desc,
            isAdmin:req.body.isAdmin,
            image:req.body.image,
            password:hashedPassword
            
        })
        const user = await newUser.save()
        const { password, ...other} = user._doc
        res.status(200).json(other)


    }catch(err){res.status(500).json(err)}
})



//LOGIN

router.post("/login", async(req, res) => {
    try{

        const user = await User.findOne({username:req.body.username})
        if(!user){ return console.log("Not registered")} 
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){ return console.log("Wrong credentials")} 

        res.status(200).json(user)

    }catch(err){res.status(500).json(err)}
})

module.exports = router