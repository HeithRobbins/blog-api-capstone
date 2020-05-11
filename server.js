require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const port = process.env.PORT || 5000
const app = express()

const blogRoutes = require("./routes/blogRoutes")

mongoose.connect("mongodb://localhost:27017/blog-db", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log("Error connecting to db: " + err);
    } else {
        console.log("Connected to db");
    }
}
)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/", blogRoutes)

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})