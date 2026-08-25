const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');


router.post('/', async (req, res) => {
  try {
    const subscription = new Subscription({
      name: req.body.name,
      cost: Number(req.body.cost),
      category: req.body.category,
      billingCycle: req.body.billingCycle,
      nextRenewalDate: req.body.nextRenewalDate,
      rating: Number(req.body.rating) || 3,
      startDate: new Date(),
      usageLevel: 'daily',
      status: 'active'
    });

    const savedSubscription = await subscription.save();
    res.status(201).json(savedSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ nextRenewalDate: 1 });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/summary', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ status: 'active' }).sort({ nextRenewalDate: 1 });

    const activeCount = subscriptions.length;
    let totalMonthlyCost = 0;
    let potentialMonthlySavings = 0;
    const categoryTotals = {};
    const categoryCounts = {}; 

    subscriptions.forEach((sub) => {
      const cost = Number(sub.cost) || 0;
      let monthlyCost = 0;

      if (sub.billingCycle === 'weekly') monthlyCost = cost * 4.33;
      else if (sub.billingCycle === 'monthly') monthlyCost = cost;
      else if (sub.billingCycle === 'yearly') monthlyCost = cost / 12;

      totalMonthlyCost += monthlyCost;

      
      if (!categoryTotals[sub.category]) categoryTotals[sub.category] = 0;
      categoryTotals[sub.category] += monthlyCost;

      
      if (!categoryCounts[sub.category]) categoryCounts[sub.category] = 0;
      categoryCounts[sub.category] += 1;

      
      const rating = Number(sub.rating) || 3;
      if (rating <= 2) {
        potentialMonthlySavings += monthlyCost;
      }
    });

    
    const overlappingCategories = Object.entries(categoryCounts)
      .filter(([_, count]) => count >= 3)
      .map(([category, count]) => ({ category, count }));

    
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const upcomingRenewals = subscriptions.filter((sub) => {
      const renewalDate = new Date(sub.nextRenewalDate);
      return renewalDate >= today && renewalDate <= thirtyDaysFromNow;
    });

    res.status(200).json({
      totalMonthlyCost: Number(totalMonthlyCost.toFixed(2)),
      potentialSavings: Number(potentialMonthlySavings.toFixed(2)),
      overlappingCategories, 
      activeCount,
      categoryTotals,
      upcomingRenewals
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;