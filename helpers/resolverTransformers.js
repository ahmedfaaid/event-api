const { user, event } = require('./resolverHelpers')
const { dateToString } = require('./date')

const bookingTransformer = booking => {
    return {
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: event.bind(this, booking._doc.event),
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

exports.bookingTransformer = bookingTransformer
exports.eventTransformer = eventTransformer
