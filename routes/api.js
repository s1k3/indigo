const express = require('express');
const moment = require('moment');
const db  = require("../database");
let router = express.Router();

router.get("/stations/:stationId", async (req, res) => {
	let at = req.query.at;
	let stationId = req.params.stationId;
	if(at == '' || at == undefined){
		res.sendStatus(404);
		return;
	}

	let time = moment(at).format("YYYY-MM-DD HH:mm:ss");
	const [rows, fields] = await db.promise().query("SELECT * FROM cron_responses where created_at = ?", [time]);
	if(rows.length > 0){
		let indigo = JSON.parse(rows[0].indigo_response);
		let filter = {
			features: [],
			type: indigo.type
		};
		indigo.features.forEach(item => {
			console.log(item);
			if(item.properties.id == stationId){
				filter.features.push(item);
			}
		});
		res.json({
			at: moment(rows[0].created_at).format("YYYY-MM-DDTHH:mm:ss"),
			stations: filter,
			weather: JSON.parse(rows[0].weather_response)
		});
	}else{
		res.sendStatus(404);
	}
});

router.get("/stations",  async (req, res) => {
	let at = req.query.at;
	if(at == '' || at == undefined){
		res.sendStatus(404);
		return;
	}

	let time = moment(at).format("YYYY-MM-DD HH:mm:ss");
	const [rows, fields] = await db.promise().query("SELECT * FROM cron_responses where created_at = ?", [time]);
	if(rows.length > 0){
		res.json({
			at: moment(rows[0].created_at).format("YYYY-MM-DDTHH:mm:ss"),
			stations: JSON.parse(rows[0].indigo_response),
			weather: JSON.parse(rows[0].weather_response)
		});
	}else{
		res.sendStatus(404);
	}
});

module.exports = router;