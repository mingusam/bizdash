const users = require('./users/users.service.js');
const companies = require('./companies/companies.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(companies);
};
