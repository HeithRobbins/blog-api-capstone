const express = require("express")

const router = express.Router()
const BlogModel = require("../models/blogModel")


router.get("/", (req, res) => {
    return res.status(200).send("<h1>Blog Router</h1>")
})
//get
router.get("/blogs", (req, res) => {
    BlogModel.find((err, results) => {
        if (err) {
            res.status(400).json({ error: true, message: "Colud not GET all blogs" })
        } else {
            const newResults = results.map((blog) => {
                return {
                    id: blog._id,
                    title: blog.title,
                    subject: blog.subject,
                    markdown: blog.markdown,
                }
            })
            res.status(200).json({ ...newResults })
        }
    })
})
//get one
router.get("/blog/:id", (req, res) => {
    BlogModel.findById(req.params.id, (err, results) => {
        if (err) {
            res.status(404).json({ error: true, message: "Could not GET by id" })
        } else {
            res.status(200).json({ message: "ok", results })
        }
    })
})

//post
router.post("/blog", (req, res) => {
    const newBlog = new BlogModel(req.body)

    newBlog
        .save()
        .then(blog => {
            res.status(200).json({ id: blog._id, title: blog.title, subject: blog.subject, markdown: blog.markdown })
        })
        .catch(err => {
            res.status(400).json({ error: true, message: "Could not post!" })
        })
})
//put
router.patch("blog/:id", (req, res) => {
    BlogModel.findById(reg, params.id, (err, result) => {

        if (err) {
            res.status(400).json({ error: true, message: "Could not Patch Blog" })
        } else {
            result.done = req.body.done

            result
                .save()
                .then(blog => {
                    res.status(200).json({ message: "Update", blog })
                })
                .catch(err => {
                    return res.status(400).json({ error: true, message: `${err}` })
                })
        }
    })
})



//delete
router.delete("blog/:id", (req, res) => {
    BlogModel.findOneAndRemove(req.params.id, (err, blog) => {
        if (err) {
            res.status(500).json({ error: true, message: "Could not Delete" })
        } else if (blog) {
            res.status(200).json({ message: "Successfully deleted", id: blog._id })
        } else {
            res.status(500).json({ error: true, message: "Your Blog dose not Exist" })
        }
    })
})

module.exports = router