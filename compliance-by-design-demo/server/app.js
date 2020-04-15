const express = require('express')
const fetch = require("node-fetch")
const app = express()
const port = 3001

const url = "api.kvk.nl"
const endpoint = "/api/v2/testprofile/companies"

async function fetchApi (endpoint) {
    return await fetch("https://" + endpoint)
        .catch(err => { console.log('caught', err.message); return {"error":"error"} })
    .then(r => r.json())
}

app.get('/api/companies/:kvknr', async (req, res) => {
    // TODO: req.params.id validation
    const data = await fetchApi(url + endpoint + "?kvkNumber=" + req.params.kvknr)
        .catch(err => { console.log('caught', err.message); return {"error":"error"} })
        .then(data => data);
    res.send(data)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
