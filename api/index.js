const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Auth");
const userRoutes = require("./routes/Users");
const postRoutes = require("./routes/Posts");
const path = require("path");


const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

const dbOptions =  { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(process.env.MONGO_URL, dbOptions)
.then(() => console.log("MongoDB is connected!"))
.catch(() => console.log("MongoDB is not connected!"))

app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
  


app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)

app.listen(process.env.PORT || 5000, () => {console.log("Hello from backend!!!")})