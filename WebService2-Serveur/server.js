const express = require('express');                //express package to render HTML pages using JS 
const morgan = require('morgan');                  //Morgan is used for logging request details
const bodyParser = require('body-parser');         //body-parser to parse the JSON Data 
const mongoose = require('mongoose');              //Mongoose package to connect to back-end mongoDB
const cors = require('cors');                      //Package to connect middle-ware or cross-platform applications
const config = require('./config');

const app = express();                              

mongoose.connect(config.database, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected à la base de données');
  }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());


const mainRoutes = require('./routes/main');

app.use('/api', mainRoutes);

 
app.listen(config.port, err => {
  console.log('Server connected at port: ' + config.port);
});