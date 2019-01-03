const express = require('express')
const express_ws = require('express-ws')
const path = require('path')

const app = express()
const expressWs = express_ws(app)

app.use(express.static(path.join(__dirname, '..', 'payload')))

app.ws('/ws', (ws, req) => {
    ws.on('message', (msg) => {
        ws.send(msg)
    })
})

const port = 8080 // TODO put in config file
app.listen(port, () => {
    console.log('Listening on port ' + port)
})
