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

//routes
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

//index route
app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts: accounts });
});

//profile route
app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`);
});
