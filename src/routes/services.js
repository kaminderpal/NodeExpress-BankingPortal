const express = require('express');
const { accounts, writeJSON } = require('../data');
const router = express.Router();

router.get('/transfer', (req, res) => {
  res.render('transfer');
});

router.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  const currentFromBalance = accounts[from].balance;
  accounts[from].balance = currentFromBalance - amount;

  const currentToBalance = accounts[to].balance;
  accounts[to].balance = parseInt(currentToBalance + amount);
  writeJSON();
  res.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

router.post('/payment', (req, res) => {
  const { amount } = req.body;
  accounts.credit.balance -= amount;
  accounts.credit.available = parseInt(accounts.credit.available + amount);
  writeJSON();
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit,
  });
});

module.exports = router;
