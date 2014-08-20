var express = require('express');
var router = express.Router();
var RoomDB = require('./../lib/share_var').RoomDB;

/* GET room */
router.get('/:room_name', function(req, res) {
	/*
	 * if すでに部屋がある then hostのpeerIDをクライアントに。
	 * else indexにリダイレクトd
	 */
	RoomDB.findOne({'room_name': req.params.room_name}, 'room_name host_pid', function(err, room){
		if (err) {
			console.log(err);
		}
		if (room != null) {
			console.log(room);
			res.render('rooms', { host_pid: room.host_pid});
		}else {
			res.redirect('/');
		}
	});
});

module.exports = router;