const fs = require('fs');
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
if (api_key_name) {
    var api_key = null
    try {
        api_key = fs.readFileSync('/run/secrets/' + api_key_name, 'utf8');
        console.log('API key succesfully loaded');
    } catch(e) {
        console.err('API key not found');
    }
}

async function fetchApi (endpoint, api_key) {
    var headers = {};
    if (api_key) {
        headers = {"apikey": api_key}
    }
    return fetch("https://" + endpoint, {headers: headers})
        .catch(err => { console.log('caught', err.message); return {"error": 1} })
        .then(data => data.json())
}

function productionCheck(req, res, next) {
    if (process.env.NODE_ENV='production') {
        next()
    } else {
        res.status(404)
    }
}

app.disable('x-powered-by');

app.use('/', productionCheck, express.static(__dirname + '/../build'))

app.get('/api/companies/:kvknr', async (req, res) => {
    // TODO: req.params.kvknr validation
    const kvknr = req.params.kvknr
    const cacheval = await redis_kvk_cache.get(kvknr)
    if (cacheval) {
        console.log('Cache hit: ' + kvknr);
        res.json(JSON.parse(cacheval))
    } else {
        console.log('Cache miss: ' + kvknr);
        const data = await fetchApi(url + endpoint + "?kvkNumber=" + kvknr, api_key)
        await redis_kvk_cache.set(kvknr, JSON.stringify(data))
        res.json(data)
    }
})

app.listen(port, () => console.log(`Web server listening on port ${port}`))
