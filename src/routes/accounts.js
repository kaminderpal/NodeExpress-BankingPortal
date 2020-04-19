const express = require('express');
const { accounts } = require('../data');

const router = express.Router();

//saving route
router.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});

//checking route
router.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});

//credit route
router.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

module.exports = router;
