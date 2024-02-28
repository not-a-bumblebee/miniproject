const express = require('express')
const router = express.Router();
let Currency;

if (process.env.NODE_ENV === "test") {
  Currency = require('../models/testCurrency').Currency;
} else {
  Currency = require('../models/currency').Currency;
}
require('dotenv').config()


let currencies = Currency

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
router.get('/currency', async (request, response) => {
  let all = await currencies.findAll();
  response.json(all)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
router.get('/currency/:id', async (request, response) => {
  try {
    let id = parseInt(request.params.id);
    let find = await currencies.findOne({ where: { id } });
    if (typeof find === 'null') {
      throw new Error("error")
    }
    response.json(find);

  } catch (error) {
    response.status(404).json({ 'error': 'resource not found' })

  }

})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
router.post('/currency', async (request, response) => {
  try {
    let post = request.body;

    console.log(post);
    if (post.hasOwnProperty('currencyCode') && post.hasOwnProperty('conversionRate')) {
      let res = await currencies.create(post);
      response.status(200).json(res)
    }
    else {
      throw new Error("error")
    }

  } catch (error) {
    console.log(error);
    response.status(400).json({ "error": "content missing" })
  }
})

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
router.put('/currency/:id/:newRate', async (request, response) => {
  try {
    let id = parseInt(request.params.id);
    let reqRate = parseFloat(request.params.newRate);
    let [_, update] = await currencies.update({ conversionRate: reqRate }, { where: { id }, returning: true },);
    console.log(update);
    response.json(update)

  } catch (error) {
    console.log(error);
  }

})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
router.delete('/currency/:id', async (request, response) => {
  try {
    let id = parseInt(request.params.id);
    let death = await currencies.destroy({ where: { id } })
    if (death) {
      response.status(204).send("")
    }
    else {
      response.status(404).send("invalid id")
    }

  } catch (error) {
    console.log(error);
  }
})



module.exports = router;
