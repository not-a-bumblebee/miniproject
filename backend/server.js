const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app
const currencyRoute = require('./routes/currency.js')
const countryRoute = require('./routes/countries.js')
const joinedRoute = require('./routes/currency-countryName.js')
require('dotenv').config()

const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(`postgres://`+process.env.UN+`:`+ process.env.PASSWORD+`@`+process.env.DB_HOSTNAME+`/`+process.env.DB_NAME+"?ssl=true",{dialect:'postgres',protocol:'postgres'})
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const {wildcard, morganLogger} = require('./utils/middleware.js')
/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())
app.use(morganLogger)


app.use('/api', currencyRoute);
app.use('/api', countryRoute);
app.use('/', joinedRoute);
app.get('/', (request, response) => {
  response.send('Hello World!')
})


app.use(wildcard);
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})