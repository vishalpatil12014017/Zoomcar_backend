const express = require("express");
const router = express.Router();

const Signup = require("../models/signup.model");

router.post("", async (req, res) => {
    const signup = await Signup.create(req.body);
    return res.status(201).send({ signup })
})


router.get("", async (req, res) => {
    
    return res.render("home.ejs")
})

// router.get("/:id", async (req, res) => {
//     const signup = await Signup.findById(req.params.id).lean().exec();
//     return res.status(200).send({ signup })
// })

router.patch("/:id", async (req, res) => {
    // const signup = await Signup.findByIdAndUpdate(req.params.id, req.body, ({ new: true })).lean().exec();
    const signup = await Signup.findByIdAndUpdate(('http://localhost:3535/signup/' + req.params.id), req.body, {new:true});

    return res.status(200).send({ signup })
})


module.exports = router

