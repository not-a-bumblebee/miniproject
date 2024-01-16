const express = require('express')  
const router = express.Router();

let currencies = [
    {
        id: 1,
        currencyCode: "CDN",
        country: "Canada",
        conversionRate: 1
    },
    {
        id: 2,
        currencyCode: "USD",
        country: "United States of America",
        conversionRate: 0.75
    }
]

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
router.get('/currency', (request, response) => {
    response.json(currencies)
  })

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
router.get('/currency/:id', (request, response) => {
  try {
    let id = parseInt(request.params.id);
    let find = currencies.find(x => x.id == id);
    if (typeof find === 'undefined') {
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
router.post('/currency', (request, response) => {
  try {
    let post = request.body;

    if (post.hasOwnProperty('id') && post.hasOwnProperty('currencyCode') && post.hasOwnProperty('country') && post.hasOwnProperty('conversionRate')) {
      currencies.push(post);
      response.json(currencies[currencies.length -1])
    }
    else {
      throw new Error("error")
    }

  } catch (error) {
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
router.put('/currency/:id/:newRate', (request, response) => {
  let id = parseInt(request.params.id);
  let reqRate = parseFloat(request.params.newRate);
  let index = currencies.findIndex(x => x.id == id);

  if (index >= 0) {
    currencies[index].conversionRate = reqRate;
  }
  response.json(currencies[index])



})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
router.delete('/currency/:id', (request, response) => {
  let id = parseInt(request.params.id);
  let index = currencies.findIndex(x => x.id == id);
  if (index >= 0) {
    currencies.splice(index,1);
    response.status(204).send("")
  }
  else{
    response.status(404).send("invalid id")
  }


})


module.exports = router;
