
const express = require('express');

const router = express.Router();
const Car = require('../models/cars.model')
const SearchInput= require("../models/search_input_model");
//CRUD operation for car
//1. create a car 

router.post("", async (req, res) => {
    const car = await Car.create(req.body)
    return res.status(201).json({ car })
})

// 2.get all cars
let items;

router.get("", async (req, res) => {
    items = await Car.find().lean().exec();
    input_data = await  SearchInput.find().sort({_id:-1}).limit(1).lean().exec();
    console.log('input_data:', input_data)
   
    return res.render("car.ejs", {
        items,
        input_data
    })
})

//decending order
router.get("/sort", async (req, res) => {
    items = await Car.find().sort({ price: -1}).lean().exec();
    return res.render("car.ejs", {
        items
    })
})
//assending order
router.get("/sorted", async (req, res) => {
    items = await Car.find().sort({ price: 1 }).lean().exec();
    return res.render("car.ejs", {
        items
    })
})
// automatic transmission
router.get("/automatic", async (req, res) => {
    items = await Car.find({ drive: "Automatic"}).lean().exec();
    return res.render("car.ejs", {
        items
    })
})
//manual transmission
router.get("/manual", async (req, res) => {
    items = await Car.find({ drive: "manual"}).lean().exec();
    return res.render("car.ejs", {
        items
    })
})
//with fual decending
router.get("/withfuel", async (req, res) => {
    items = await Car.find().sort({ price1: -1}).lean().exec();
    for(let i=0;i<items.length;i++){
        items[i].price=items[i].price1
    }
    return res.render("car.ejs", {
        items
    })
})



// router.get("/:id", async (req, res) => {
//   const items = await Products.find().sort({ price: -1 });
//   res.render("new.ejs", {
//     items,
//   });
//   // res.send(items);
// });


// // 3. get a single car
// router.get("/:id", async (req, res) => {
//     const car = await Car.find(req.params.id).lean().exec()
//     return res.status(200).json({ car })
// })


router.get("/login",async (req, res)=>{
    res.render("login.ejs", {
    })
})
router.get("/singupnew",async (req, res)=>{
    res.render("signupnew.ejs", {
    })
})
module.exports = router;