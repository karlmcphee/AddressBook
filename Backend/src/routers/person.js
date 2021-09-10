const Person = require('../models/person')
const express = require('express')

const router = new express.Router()

router.post('/person/save', async (req, res) => {
    const person = new Person({'name': req.body.name, 'address': req.body.address});
    
        try {
            await person.save()
            res.status(201).send({ person })
        } catch (e) {
            res.status(400).send(e)
    }
})


router.get('/persons', async (req, res) => {
    try {
    const persons = await Person.find({})
    res.send(persons)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/person/:id', async (req, res) => {
    const persons = await Person.find({})
    var word = req.params.id.toLowerCase();
    var words = [];
    try {
    var list1 = [];
    for (var i = 0; i < persons.length; i++) {
         var person = persons[i];
         words = person.name.split(" ");
         for (var j = 0; j < words.length; j++) {
             words[j] = words[j].toLowerCase(); 
             if(words[j].includes(word)) {
                list1.push(persons[i]);
                break;
             }
            }
         }
    res.send(list1)
    } catch(e) {
        res.status(500).send("Something went wrong")
    }

})

router.post('/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'address']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        res.status(400).send({error: 'Invalid updates'})
    }
    try {
    const testPerson = await Person.find({"name": req.body.name})
    if(req.body.name != req.params.id && testPerson.length > 0) {
        return res.status(400).send("Duplicate names cannot be present")
    }} catch(e) {
        return res.status(400).send("Something went wrong")
    }
    const query = { "name": req.params.id }
    try {
        Person.updateOne(query, {$set: {"name": req.body.name, "address": req.body.address} }, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        })
        return res.status(200).send("zz" + req.body.address)
    } catch (e) {
        res.status(400).send()
    }})

//auth

router.delete('/delete/:id', async (req, res) => {
    try {
        Person.deleteOne({"name": req.params.id}, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted")})
            return res.status(200).send("Deletion accomplished")
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/clear', async (req, res) => {
    try {
        Person.deleteMany({}, function(err, obj) {
            if (err) throw err;
            console.log("All documents deleted")})
            return res.status(200).send("Deletion accomplished")
    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router