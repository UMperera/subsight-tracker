const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    cost: {
      type: Number,
      required: true
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },

    billingCycle: {
      type: String,
      enum: ['weekly', 'monthly', 'yearly'],
      required: true
    },

    startDate: {
      type: Date,
      default: Date.now
    },

    nextRenewalDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ['trial', 'active', 'paused', 'cancelled'],
      default: 'active'
    },

    trialEndDate: {
      type: Date
    },

    usageLevel: {
      type: String,
      enum: ['daily', 'weekly', 'rarely', 'never'],
      default: 'daily'
    },

    reminderDaysBefore: {
      type: Number,
      default: 3
    },

    lastReminderSent: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);