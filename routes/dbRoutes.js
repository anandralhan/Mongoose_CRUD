const express = require("express");
const Details = require("../models/details");
const router = express.Router();


// First Get Request to get all the details
router.get("/details", async (req, res) => {
    const details = await Details.find()
    res.send(details)
});
// Post request to add to the database
router.post("/details", async (req, res) => {
    const details = new Details({
        name: req.body.name,
        age: req.body.age,
        content : req.body.content
    })
    await details.save()
    res.send(details)
})
// Patch request to update
router.patch("/details/:id", async (req, res) => {
    try {
        const details = await Details.findOne({ _id: req.params.id })

        if (req.body.title) {
            details.title = req.body.title
        }

        if (req.body.content) {
            details.content = req.body.content
        }

        await details.save()
        res.send(details)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
});
// Delete to delete it
router.delete("/details/:id", async (req, res) => {
    try {
        await Details.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
})
module.exports = router