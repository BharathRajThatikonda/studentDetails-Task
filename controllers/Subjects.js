var Subjects = require('../models/Subjects');

module.exports = function (app) {
    app.post('/subject', (req, res) => {
        var input = req.body;
        var subject = new Subjects(input);
        subject.save((err) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                var result = subject.toObject();
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })
}