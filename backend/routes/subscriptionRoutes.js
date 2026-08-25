const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');


// ======================================================
// ADD SUBSCRIPTION
// POST /api/subscriptions
// ======================================================

router.post('/', async (req, res) => {
  try {
    console.log('Received subscription data:', req.body);

    const subscription = new Subscription({
      name: req.body.name,
      cost: Number(req.body.cost),
      category: req.body.category,
      billingCycle: req.body.billingCycle,
      nextRenewalDate: req.body.nextRenewalDate,

      startDate: new Date(),
      usageLevel: 'daily',
      status: 'active'
    });

    const savedSubscription = await subscription.save();

    console.log('Subscription saved:', savedSubscription);

    res.status(201).json(savedSubscription);

  } catch (error) {
    console.error('Error adding subscription:', error);

    res.status(500).json({
      message: error.message
    });
  }
});


// ======================================================
// GET ALL SUBSCRIPTIONS
// GET /api/subscriptions
// ======================================================

router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .sort({ nextRenewalDate: 1 });

    res.status(200).json(subscriptions);

  } catch (error) {
    console.error('Error getting subscriptions:', error);

    res.status(500).json({
      message: error.message
    });
  }
});





router.get('/summary', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      status: 'active'
    }).sort({
      nextRenewalDate: 1
    });



    const activeCount = subscriptions.length;


  

    let totalMonthlyCost = 0;

    subscriptions.forEach((sub) => {
      const cost = Number(sub.cost) || 0;

      if (sub.billingCycle === 'weekly') {
        totalMonthlyCost += cost * 4.33;
      }

      else if (sub.billingCycle === 'monthly') {
        totalMonthlyCost += cost;
      }

      else if (sub.billingCycle === 'yearly') {
        totalMonthlyCost += cost / 12;
      }
    });


    

    const categoryTotals = {};

    subscriptions.forEach((sub) => {
      const cost = Number(sub.cost) || 0;

      let monthlyCost = 0;

      if (sub.billingCycle === 'weekly') {
        monthlyCost = cost * 4.33;
      }

      else if (sub.billingCycle === 'monthly') {
        monthlyCost = cost;
      }

      else if (sub.billingCycle === 'yearly') {
        monthlyCost = cost / 12;
      }


      if (!categoryTotals[sub.category]) {
        categoryTotals[sub.category] = 0;
      }

      categoryTotals[sub.category] += monthlyCost;
    });



    const today = new Date();

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(
      today.getDate() + 30
    );


    const upcomingRenewals = subscriptions.filter((sub) => {
      const renewalDate = new Date(sub.nextRenewalDate);

      return (
        renewalDate >= today &&
        renewalDate <= thirtyDaysFromNow
      );
    });


    res.status(200).json({
      totalMonthlyCost: Number(totalMonthlyCost.toFixed(2)),
      activeCount,
      categoryTotals,
      upcomingRenewals
    });

  } catch (error) {
    console.error('Error generating summary:', error);

    res.status(500).json({
      message: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    
    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    console.log('Deleted subscription:', req.params.id);
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ message: error.message });
  }
  });

module.exports = router;