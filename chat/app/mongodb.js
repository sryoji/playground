var mongoose = require('mongoose');

// mongodb

exports.RoomSchema = new mongoose.Schema({
    room_name : String,
    host_pid : String
});
