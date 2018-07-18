var Student = require('../models/studentSchema');
var contactDetails = require('../models/contactDetails');
var StudentAssociation = require('../models/StudentSubjectAssociation');

module.exports = function (app) {
    app.post('/student', (req, res) => {
        var input = req.body;
        var student = new Student(input);
        student.save((err) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                var result = student.toObject();
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })

    app.put('/student/:id', (req, res) => {
        Student.findOneAndUpdate({ _id: req.params.id }, { new: true }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.delete('/student/:id', (req, res) => {
        Student.remove({ _id: req.params.id }, (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                res.json({ status: 200, message: "Success", data: data })
            }
        })
    })

    app.get('/details', (req, res) => {
        Student.aggregate([
            { $lookup: { from: 'StudentAssociation', localField: '_id', foreignField: 'studentId', as: 'subjects' } },
            { $unwind: "$subjects" }, { $unwind: "$subjects.subjectId" },
            { $lookup: { from: 'Subjects', localField: 'subjects.subjectId', foreignField: '_id', as: 'subjectName' } },
            { $unwind: "$subjectName" },
            { $group: { _id: "$_id", "subjects": { $push: "$subjectName" } } },
            { $lookup: { from: 'ContactDetails', localField: '_id', foreignField: 'studentId', as: 'contact' } },
            { $unwind: "$contact" },
            {
                $project: {
                    _id: 1, name: 1, dob: 1, gender: 1, phNumber: "$contact.phNumber", emailId: "$contact.emailId",
                    address: "$contact.address", subjects: "$subjects"
                }
            }
        ], (err, data) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            if (data) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    result.push(data[i]._id)
                }
                Student.find({ _id: { $in: result } }, (err1, data1) => {
                    for (let i of data) {
                        for (let j of data1) {
                            if (String(i._id) === String(j._id)) {
                                i.name = j.name; i.dob = j.dob; i.gender = j.gender;
                                delete i._id;
                            }
                        }
                    }
                    res.json({ status: 200, message: "Success", data: data })
                })
            }
        })
    })
}



