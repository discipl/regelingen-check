const fetch = require("node-fetch")

const express = require('express')
const app = express()
const port = 3001

const redis = require("async-redis");
const redis_kvk_cache = redis.createClient(
    process.env.REDIS_KVK_CACHE_PORT,
    process.env.REDIS_KVK_CACHE_HOST
);

redis_kvk_cache.on('connect', function() {
    console.log('Redis client connected');
});
redis_kvk_cache.on("error", function(error) {
    console.error(error);
});

const url = "api.kvk.nl"
const endpoint = "/api/v2/testprofile/companies"

async function fetchApi (endpoint) {
    return await fetch("https://" + endpoint)
        .catch(err => { console.log('caught', err.message); return {"error":"error"} })
    .then(r => r.json())
}

app.get('/api/companies/:kvknr', async (req, res) => {
    // TODO: req.params.kvknr validation
    const kvknr = req.params.kvknr
    const cacheval = await redis_kvk_cache.get(kvknr)
    if (cacheval) {
        console.log('Cache hit: ' + kvknr);
        res.json(JSON.parse(cacheval))
    } else {
        console.log('Cache miss: ' + kvknr);
        const data = await fetchApi(url + endpoint + "?kvkNumber=" + kvknr)
            .catch(err => { console.log('caught', err.message); return {"error":"error"} })
            .then(data => data);
        await redis_kvk_cache.set(kvknr, JSON.stringify(data))
        res.json(data)
    }
})

app.listen(port, () => console.log(`Web server listening on port ${port}`))
