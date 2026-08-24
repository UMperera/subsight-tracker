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