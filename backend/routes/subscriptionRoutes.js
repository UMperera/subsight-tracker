const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Subscription = require('../models/Subscription');

router.get('/summary', auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });

    const totalMonthlyCost = subscriptions.reduce((acc, sub) => {
      return acc + sub.cost;
    }, 0);

    const activeCount = subscriptions.length;

    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const upcomingRenewals = subscriptions
      .filter(sub => {
        const renewalDate = new Date(sub.nextRenewalDate);
        return renewalDate >= today && renewalDate <= thirtyDaysFromNow;
      })
      .sort((a, b) => new Date(a.nextRenewalDate) - new Date(b.nextRenewalDate))
      .slice(0, 5);

    res.json({
      totalMonthlyCost,
      activeCount,
      upcomingRenewals
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, cost, billingCycle, nextRenewalDate, category } = req.body;
    
    const newSubscription = new Subscription({
      user: req.user.id,
      name,
      cost,
      billingCycle,
      nextRenewalDate,
      category
    });

    const savedSubscription = await newSubscription.save();
    res.json(savedSubscription);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id }).sort({ nextRenewalDate: 1 });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    let subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscription removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;