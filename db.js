const knex = require('knex')
const Pool = require('pg').Pool

module.exports = knex({
  client: 'pg',
  connection: 'postgres://docker:1234567@db/docker'
})