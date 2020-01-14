const Event = require('../models/event')
const User = require('../models/user')

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return eventTransformer(event)
        })
    } catch (err) {
        throw err
    }
}

const event = async eventId => {
    try {
        const singleEvent = await Event.findById(eventId)
        return eventTransformer(singleEvent)
    } catch (err) {
        throw err
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        }
    } catch (err) {
        throw err
    }
}

// exports.events = events
exports.event = event
exports.user = user
