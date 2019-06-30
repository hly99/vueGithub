var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demoSchema = new Schema({
    uid: String,
    title: Number,
});

exports.Demo = mongoose.model('demo', demoSchema, 'demo');