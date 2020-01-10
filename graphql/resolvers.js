const Event = require('../models/event')

module.exports = {
    events: () => {
        return Event.find()
    },
    createEvent: args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date)
        })
        return event
            .save()
            .then(result => {
                console.log(result)
                return { ...result._doc }
            })
            .catch(err => {
                console.log(err.message)
                throw err
            })
    }
}
