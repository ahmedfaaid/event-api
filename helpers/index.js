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

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId)
        return eventTransformer(event)
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

const bookingTransformer = booking => {
    return {
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}

const eventTransformer = event => {
    return {
        ...event._doc,
        creator: user.bind(this, event.creator),
        date: dateToString(event._doc.date)
    }
}

const dateToString = date => new Date(date).toISOString()

exports.dateToString = dateToString
exports.singleEvent = singleEvent
exports.user = user
exports.bookingTransformer = bookingTransformer
exports.eventTransformer = eventTransformer
