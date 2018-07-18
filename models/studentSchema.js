var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentModel = function () {
    var studentSchema = Schema({
        name: String,
        dob: { type: String, require: true, trim: true },
        gender: { type: String, require: true, trim: true }
    }, { versionKey: false, collection: "Students" })

    return mongoose.model("Students", studentSchema)
}
module.exports = new studentModel();