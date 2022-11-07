const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express');
const moment = require('moment');
const config = require("../config");
const db  = require("../database");
const router = express.Router();


router.get("/",async (req,res) => {

    let indigoRequest = await fetch(config.bicycleTransit);
    let indigoResponse = await indigoRequest.json();
    
    let weatherRequest = await fetch(config.openWeather);
    let weatherResponse = await weatherRequest.json();

    let createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    let query = `INSERT INTO cron_responses( created_at, indigo_response, weather_response) VALUES (?, ?, ?)`;
    await db.promise().query({sql: query}, [createdAt, JSON.stringify(indigoResponse), JSON.stringify(weatherResponse)]);
    res.json({"status":"success"});
});

module.exports = router;