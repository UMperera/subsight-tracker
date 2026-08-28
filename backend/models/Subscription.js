const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // <-- Must have this!
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  category: { type: String, required: true },
  billingCycle: { type: String, required: true },
  nextRenewalDate: { type: Date, required: true },
  rating: { type: Number, default: 3 },
  status: { type: String, default: 'active' },
  acknowledgedDate: { type: Date, default: null }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);