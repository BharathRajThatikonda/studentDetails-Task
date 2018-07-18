var StudentAssociation = require('../models/StudentSubjectAssociation');
var ContactDetails = require('../models/contactDetails')

module.exports = function (app) {
    app.post('/studentAssoc', (req, res) => {
        var input = req.body;
        var studentAssoc = new StudentAssociation(input);
        studentAssoc.save((err) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                var result = studentAssoc.toObject();
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })

    app.get('/userDetails', (req, res) => {
        StudentAssociation.find({}, { _id: 0 }).populate('name').exec((err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err });
            if (data) {
                var result = []
                StudentAssociation.populate(data, {
                    path: 'studentId',
                    select: ' name gender dob '
                }, function (err, userData) {
                    res.json({ status: 200, message: "Success", data: userData })
                 })
                // for (let i of data) {
                //     contactDetails(i.studentId).then((resu)=>{
                //         result.push(resu);
                //     })
                // }
            }
        })
    })
}
