const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app
const apiRoute = require('./routes/api.js')

const {wildcard, morganLogger} = require('./utils/middleware.js')
/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())
app.use(morganLogger)


app.use('/api', apiRoute);
app.get('/', (request, response) => {
  response.send('Hello World!')
})


app.use(wildcard);
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})