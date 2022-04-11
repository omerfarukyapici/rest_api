const express = require('express');
const subscriber = require('../models/subscriber');
const router = express.Router();
const Subscriber = require('../models/subscriber')

// REST APİ Process

/* ----------------------------------------------------------------------------- */
// Getting All Subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/* ----------------------------------------------------------------------------- */
// Getting One Subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})




/* ----------------------------------------------------------------------------- */
// Creating One Subscriber
router.post('/', async (req, res) => {
    const sub = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSub = await sub.save()
        res.status(201).json(newSub)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})




/* ----------------------------------------------------------------------------- */
// Updating One Subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscriberdToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})





/* ----------------------------------------------------------------------------- */
// Deleting One Subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: "Deleted Subscriber" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })

    }
    res.subscriber = subscriber
    next()
}


module.exports = router