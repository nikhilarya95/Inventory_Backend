const cron = require('node-cron');
const Stock = require('../models/Stock');
const User = require('../models/User');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const emailService = require('./emailService');

const checkLowStock = async () => {
  try {
    console.log('Running low stock check...');
    
    const lowStockItems = await Stock.find({ 
      quantity: { $lt: 3 }, 
      isActive: true 
    }).populate('product');

    if (lowStockItems.length === 0) {
      console.log('No low stock items found');
      return;
    }

    const admins = await User.find({ 
      roles: 'Admin', 
      isActive: true 
    });

    for (const admin of admins) {
      if (admin.email) {
        const result = await emailService.sendLowStockAlert(admin.email, lowStockItems);
        console.log(`Low stock alert sent to ${admin.email}:`, result);
      }
    }
  } catch (error) {
    console.error('Low stock check error:', error);
  }
};

const sendOrderReminders = async () => {
  try {
    console.log('Running order reminder check...');
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentOrders = await Order.find({
      isActive: true,
      orderDate: { $gte: thirtyDaysAgo }
    }).distinct('customer');

    const customers = await Customer.find({
      isActive: true,
      _id: { $nin: recentOrders }
    });

    if (customers.length === 0) {
      console.log('No customers need order reminders');
      return;
    }

    const salesMen = await User.find({
      roles: 'Sales Man',
      isActive: true
    });

    for (const salesMan of salesMen) {
      if (salesMan.email) {
        const result = await emailService.sendOrderReminder(salesMan.email, customers);
        console.log(`Order reminder sent to ${salesMan.email}:`, result);
      }
    }
  } catch (error) {
    console.error('Order reminder error:', error);
  }
};

const initCronJobs = () => {
  // cron.schedule('0 9 * * *', checkLowStock);
  
  // cron.schedule('0 8 * * *', sendOrderReminders);

  console.log('Cron jobs initialized');
};

module.exports = { initCronJobs, checkLowStock, sendOrderReminders };
