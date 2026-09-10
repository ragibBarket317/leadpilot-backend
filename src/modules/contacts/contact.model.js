const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    leadStatus: {
      type: String,
      enum: [
        'new',
        'replied',
        'contacted',
        'meeting',
        'won',
        'lost',
        'qualified',
        'researching',
      ],
      default: 'new',
    },

    lastContacted: {
      type: Date,
    },

    nextFollowUp: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
