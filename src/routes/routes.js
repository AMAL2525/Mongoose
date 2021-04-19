var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const Person = require('../models/person');

router.post('/', (req, res, next) => {

    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        favoriteFoods: req.body.favoriteFoods
    });

    // person.create(, (err, createdPeople) =>{
    //     if (err){
    //         console.log(err)
    //     }else{
    //         done(null, createdPeople)
    //     }
    // })
    person.save().then(result => {
        console.log(result);
    })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling Post request to /person",
        createPerson: person
    });


});
router.get("/", async (req, res, next) => {
    try {
        const person = await Person.find()
        res.send(person)
    } catch (error) {
        console.log(error);
        res.statut(500).json({
            error
        })
    }
});
    router.get("/:_id", async (req, res, next) => {
        console.log(req.params)
        const _id= req.params._id
     try {
         const person = await Person.findById(_id)
         res.send(person)
     } catch (error) {
         console.log(error);
         res.statut(404).json({error})
     }
});
router.delete("/:_id", async (req,res, next) =>{
    console.log(req.params)
    const _id= req.params._id
    try {
        const person = await Person.findByIdAndDelete({_id})
        if(!person){
        res.send({message: "person doesn't exist", })

        }
        res.send({message: "person deleted successfully",person, })
    } catch (error) {
        console.log(error);
        res.statut(200).json({error})
    }
});
router.patch("/:_id", async (req,res,next) =>{

    const _id = req.params._id
    const updatedPerson = req.body
    console.log(req.body)
    try {
        const person = await Person.findOneAndUpdate({_id}, updatedPerson)
        const modif =await Person.findById({_id})
        res.send(person)
    } catch (error) {
        console.log(error);
        res.statut(404).json({error})
    }
})
module.exports = router;