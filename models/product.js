var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: Number, required: true},
});

model.exports = mongoose.model('Product',schema);