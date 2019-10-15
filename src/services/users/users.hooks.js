const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const addAssociations = require('./../../hooks/add-associations');


module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), 
            addAssociations({
              models: [
                  {
                      model: 'companies',
                      as: 'CompanyID'
                  }
              ]
            }) 
    ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), authenticate('jwt') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
