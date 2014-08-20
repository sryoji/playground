/*
 * 部屋一覧を表示
 */
var express = require('express');
var router = express.Router();
var RoomDB = require('./../lib/share_var').RoomDB;

/* GET room */
router.get('/', function(req, res) {
	RoomDB.find(function(err, rooms){
		if (err) {
			console.log(err);
		}
		if (rooms != null) {
			console.log(rooms);
			res.send(rooms);
		}else {
			res.send('no rooms');
		}
	});
});

module.exports = router;