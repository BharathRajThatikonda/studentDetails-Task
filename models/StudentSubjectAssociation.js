var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var studentModel = function () {
    var studentSchema = Schema({
        studentId: { type: Schema.Types.ObjectId, autopopulate: true, ref: "Students" },
        subjectId: { type: Array, autopopulate: true, ref: "Subjects" }
    }, { versionKey: false, collection: "StudentAssociation" })

    return mongoose.model("StudentAssociation", studentSchema)
}
module.exports = new studentModel();