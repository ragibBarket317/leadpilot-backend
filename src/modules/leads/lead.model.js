const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema(
  {
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact',
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },

    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    intent: {
      type: String,
      trim: true,
    },

    opportunity: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        'new',
        'researching',
        'qualified',
        'contacted',
        'replied',
        'meeting',
        'won',
        'lost',
      ],
      default: 'new',
    },

    lastContact: {
      type: Date,
    },

    nextAction: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

const Lead = mongoose.model('Lead', leadSchema)

module.exports = Lead
