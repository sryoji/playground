/*
 * 部屋を作る
 */
var express = require('express');
var router = express.Router();
var RoomDB = require('./../lib/share_var').RoomDB;

router.get('/', function(req, res) {
	console.log(req.query);

	// 部屋の有無を確認
	RoomDB.findOne({'room_name': req.query.room_name}, 'room_name host_pid', function(err, room){
		if (err) {
			console.log(err);
		}
		console.log(room);
		// 部屋がなければ作る
		if (room == null) {
			var new_room = new RoomDB(req.query);
			new_room.save(function(err){
				if(err) {
					console.log(err);
					res.send('create room: fail');
				}
				console.log("create room:" + req.query);
				res.send('create room: success');
			});
		}else {
			res.send('すでに部屋があります。');
		}
	});
});

module.exports = router;