var ContactDetails = require('../models/contactDetails');

module.exports = function (app) {
    app.post('/contactDetails', (req, res) => {
        var input = req.body;
        var contact = new ContactDetails(input);
        contact.save((err) => {
            if (err) res.json({ status: 404, message: "Failure", data: err })
            else {
                var result = contact.toObject();
                res.json({ status: 200, message: "Success", data: result })
            }
        })
    })
}