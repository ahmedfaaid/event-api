const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToString } = require('../../helpers/date')
const { eventTransformer } = require('../../helpers/resolverTransformers')

module.exports = {
    events: async () => {
        try {
            const events = await Event.find().populate('creator')
            return events.map(event => {
                return eventTransformer(event)
            })
        } catch (err) {
            throw err
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuthenticated) {
            throw new Error('Unauthenticated')
        }
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: dateToString(args.eventInput.date),
                creator: req.userId
            })

            let createdEvent

            const result = await event.save()
            createdEvent = eventTransformer(result)
            const creator = await User.findById(req.userId)

            if (!creator) {
                throw new Error('User not found')
            }
            creator.createdEvents.push(event)
            await creator.save()

            return createdEvent
        } catch (err) {
            throw err
        }
    }
}
