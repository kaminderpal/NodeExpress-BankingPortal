const fs = require('fs');
const path = require('path');

//reading account data module.
const accountData = fs.readFileSync('src/json/accounts.json', {
  encoding: 'utf8',
});
const accounts = JSON.parse(accountData);

//reading user data
const userData = fs.readFileSync('src/json/users.json', { encoding: 'utf8' });
const users = JSON.parse(userData);

const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(
    path.join(__dirname, 'json/accounts.json'),
    accountsJSON,
    'utf8'
  );
};

module.exports = { accounts, users, writeJSON };
