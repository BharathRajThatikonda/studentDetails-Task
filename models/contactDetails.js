var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate=require('mongoose-autopopulate');

var contactModel = function () {
    var contactSchema = Schema({
        studentId: { type: Schema.Types.ObjectId, ref: 'Students',autopopulate: true },
        phNumber: {type:String,require:true},
        emailId: { type: String, require: true, trim: true },
        address: { type: String, require: true, trim: true }
    }, { versionKey: false, collection: "ContactDetails" })

    return mongoose.model("ContactDetails", contactSchema)
}
module.exports = new contactModel();