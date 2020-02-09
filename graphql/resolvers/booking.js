const Event = require('../../models/event')
const Booking = require('../../models/booking')
const { bookingTransformer, eventTransformer } = require('../../helpers')

module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuthenticated) {
            throw new Error('Unauthenticated')
        }
        try {
            const bookings = await Booking.find({ user: req.userId })

            return bookings.map(booking => {
                return bookingTransformer(booking)
            })
        } catch (err) {
            throw err
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuthenticated) {
            throw new Error('Unauthenticated')
        }

        const fetchedEvent = await Event.findOne({ _id: args.eventId })

        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent
        })

        const result = await booking.save()

        return bookingTransformer(result)
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuthenticated) {
            throw new Error('Unauthenticated')
        }

        try {
            const booking = await Booking.findById(args.bookingId).populate(
                'event'
            )

            const event = eventTransformer(booking.event)

            await Booking.deleteOne({ _id: args.bookingId })

            return event
        } catch (err) {
            throw err
        }
    }
}
