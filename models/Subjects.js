var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectModel = function () {
    var subjectSchema = Schema({
        _id: Number,
        subjectName: { type: String, require: true, trim: true }
    }, { _id: false, versionKey: false, collection: "Subjects" })

    return mongoose.model("Subjects", subjectSchema)
}
module.exports = new subjectModel();