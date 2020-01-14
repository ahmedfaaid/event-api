const Event = require('../../models/event')
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
    createEvent: async args => {
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: dateToString(args.eventInput.date),
                creator: '5e1a5140a2af7b2c54fdc44b'
            })

            let createdEvent

            const result = await event.save()
            createdEvent = eventTransformer(result)
            const creator = await User.findById('5e1a5140a2af7b2c54fdc44b')

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
