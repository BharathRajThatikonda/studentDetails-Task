var express = require('express');
var mongoose = require('./db/dbConnect');
var bodyParser=require('body-parser');

var app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

require('./controllers/student')(app);
require('./controllers/contactDetails')(app);
require('./controllers/Subjects')(app);
require('./controllers/StudentAssociation')(app);

console.log("BinduLatha");
app.get('/', (req, res) => {
    return res.send("Bharath Thatikonda")
})
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  module.exports = {app};
