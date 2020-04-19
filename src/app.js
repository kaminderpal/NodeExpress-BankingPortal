const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

//reading account data module.
const accountData = fs.readFileSync('src/json/accounts.json', {
  encoding: 'utf8',
});
const accounts = JSON.parse(accountData);

//reading user data
const userData = fs.readFileSync('src/json/users.json', { encoding: 'utf8' });
const users = JSON.parse(userData);

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

app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`);
});
