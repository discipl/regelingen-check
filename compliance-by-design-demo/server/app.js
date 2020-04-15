const fetch = require("node-fetch")

const express = require('express')
const app = express()
const port = process.env.API_PORT || 3001

const redis = require("async-redis");
const redis_kvk_cache = redis.createClient(
    process.env.REDIS_KVK_CACHE_PORT || 6379,
    process.env.REDIS_KVK_CACHE_HOST || "localhost"
);

redis_kvk_cache.on('connect', function() {
    console.log('Redis client connected');
});
redis_kvk_cache.on("error", function(error) {
    console.error(error);
});

const url = process.env.KVK_API_URL || "api.kvk.nl"
const endpoint = process.env.KVK_API_ENDPOINT || "/api/v2/testprofile/companies"
const api_key_name = process.env.KVK_API_KEY

async function fetchApi (endpoint) {
    return fetch("https://" + endpoint)
        .catch(err => { console.log('caught', err.message); return {"error": 1} })
        .then(data => data.json())
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
        await redis_kvk_cache.set(kvknr, JSON.stringify(data))
        res.json(data)
    }
})

app.listen(port, () => console.log(`Web server listening on port ${port}`))
