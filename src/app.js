const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const { accounts, users, writeJSON } = require('./data');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//index route
app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts: accounts });
});

//saving route
app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});

//checking route
app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});

//credit route
app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

//profile route
app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  const currentFromBalance = accounts[from].balance;
  accounts[from].balance = currentFromBalance - amount;

  const currentToBalance = accounts[to].balance;
  accounts[to].balance = parseInt(currentToBalance + amount);
  writeJSON();
  res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

app.post('/payment', (req, res) => {
  const { amount } = req.body;
  accounts.credit.balance -= amount;
  accounts.credit.available = parseInt(accounts.credit.available + amount);
  writeJSON();
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit,
  });
});

app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`);
});
