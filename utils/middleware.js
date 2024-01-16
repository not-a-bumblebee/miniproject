var morgan = require('morgan')

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body');

const wildcard = (req, res) => {
    res.status(404).json({ error: 'unknown endpoint' })
}

module.exports = {morganLogger, wildcard}