/*
 * mameのメインjavascriptソース
 *
 */

var mame = function() {

	var APIKEY = "6165842a-5c0d-11e3-b514-75d3313b9d05";
	var DEBUG_MODE = 0;

	var peer = null;
	var myid = null;
	var connectId = null;

	var connect = function(c) {
		console.log("peer.on('connection') called." + c.peer);
		connectId = c.peer;
		$("#peers").text(connectId);
		c.on('data', receive);
	}

	var receive = function(data) {
		console.log('Received: ' + data);
		$("#msgarea").text(data);
	}

	return {
		// 最初に呼ぶ
		init : function() {
			peer = new Peer({key : APIKEY, debug : DEBUG_MODE});
			peer.on('open', function(id) {
				myId = id;
				console.log('My peer ID is: ' + myId);
			});
			peer.on('connection', connect);
		},

		// 最初に接続するときに呼ぶ
		connecting : function(to) {
			console.log("connect to " + to);
			connectId = to;
			var conn = peer.connect(to);
			conn.on('open', function(){
				console.log("conn.on('data') called.");
				conn.send("Hello!");
				connect(conn);
			});
		},

		create_room :function(room_name) {
			$.ajax({
				url: "/create_room?room_name=" + room_name + "&host_pid=" + myId,
				type: "GET",
				success: function(obj) {
					console.log(obj);
				},
				error: function(e) {
					console.log(e);
				}
			});
		},

		send : function(msg) {
			var conn = peer.connections[connectId][0];
			conn.send(msg);
		},

		close : function() {
			if (!!peer && !peer.destroyed) {
				peer.destroy();
			}
		}
	}
}();