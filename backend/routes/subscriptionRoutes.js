const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const verifyToken = require('../middleware/auth'); 

router.post('/', verifyToken, async (req, res) => {
  try {
    const subscription = new Subscription({
      userId: req.user.id, 
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


router.get('/', verifyToken, async (req, res) => {
  try {
    
    const subscriptions = await Subscription.find({ userId: req.user.id }).sort({ nextRenewalDate: 1 });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/summary', verifyToken, async (req, res) => {
  try {
    
    const subscriptions = await Subscription.find({ userId: req.user.id, status: 'active' }).sort({ nextRenewalDate: 1 });

    const activeCount = subscriptions.length;
    let totalMonthlyCost = 0;
    let potentialMonthlySavings = 0;
    const categoryTotals = {};
    const categoryCounts = {}; 

    subscriptions.forEach((sub) => {
      const cost = Number(sub.cost) || 0;
      let monthlyCost = 0;

      const cycle = (sub.billingCycle || 'monthly').toLowerCase();

      if (cycle === 'weekly') {
        monthlyCost = cost * 4.33;
      } else if (cycle === 'yearly') {
        monthlyCost = cost / 12;
      } else {
        monthlyCost = cost;
      }

      totalMonthlyCost += monthlyCost;
      
      const category = sub.category || 'Uncategorized';
      if (!categoryTotals[category]) categoryTotals[category] = 0;
      categoryTotals[category] += monthlyCost;
      
      if (!categoryCounts[category]) categoryCounts[category] = 0;
      categoryCounts[category] += 1;
      
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


router.delete('/:id', verifyToken, async (req, res) => {
  try {
    
    const deletedSubscription = await Subscription.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id 
    });

    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found or unauthorized' });
    }
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/acknowledge/:id', async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub) return res.status(404).send('Subscription not found');

    await Subscription.findByIdAndUpdate(req.params.id, {
      acknowledgedDate: sub.nextRenewalDate
    });
    
    res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #f0fdf4; color: #166534; height: 100vh;">
        <h1 style="font-size: 2.2rem;">✔️ Reminder Paused</h1>
        <p style="font-size: 1.2rem;">We won't send you any more emails about <strong>${sub.name}</strong> for this month's bill.</p>
        <p style="color: #475569;">You can safely close this window.</p>
      </div>
    `);
  } catch (err) {
    console.error('PAUSE ERROR:', err.message); 
    res.status(500).send('An error occurred while pausing the reminder.');
  }
});

module.exports = router;