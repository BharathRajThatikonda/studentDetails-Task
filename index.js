var express = require('express');
var mongoose = require('./db/dbConnect');
var bodyParser=require('body-parser');

var app = express();
app.use(bodyParser.json());

require('./controllers/student')(app);
require('./controllers/contactDetails')(app);
require('./controllers/Subjects')(app);
require('./controllers/StudentAssociation')(app);
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    return res.send("Bharath Thatikonda")
})
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });