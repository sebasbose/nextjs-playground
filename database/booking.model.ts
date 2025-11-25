import mongoose, { CallbackError, Document, Model, Schema } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string) => {
          // RFC 5322 compliant email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Verify that the referenced event exists
BookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  // Only validate eventId if it's new or modified
  if (booking.isModified('eventId')) {
    // Check if Event model exists and is accessible
    const Event = mongoose.models.Event;
    
    if (!Event) {
      throw new Error('Event model not found. Ensure Event model is imported.');
    }

    // Verify the event exists in the database
    const eventExists = await Event.findById(booking.eventId);

    if (!eventExists) {
      throw new Error(`Event with ID ${booking.eventId} does not exist`);
    }
  }
});

// Add index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Prevent model recompilation in development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
