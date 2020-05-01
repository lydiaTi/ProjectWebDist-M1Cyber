const express = require('express');                //express package to render HTML pages using JS 
const morgan = require('morgan');                  //Morgan is used for logging request details
const bodyParser = require('body-parser');         //body-parser to parse the JSON Data 
const mongoose = require('mongoose');              //Mongoose package to connect to back-end mongoDB
const cors = require('cors');                      //Package to connect middle-ware or cross-platform applications
const config = require('./config');

const app = express();                              //wrapping the new express application in app variable 

// Only include useMongoClient only if your mongoose version is < 5.0.0
mongoose.connect(config.database, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

app.get('/test', (req, res) => {
    res.send('Miam port 3030');
});

//express application using required packages 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

const userRoutes = require('./routes/compte');
const mainRoutes = require('./routes/main');


//express application using Routes from this application
app.use('/api', mainRoutes);
app.use('/api/comptes', userRoutes);



//Setting up the port for server to run on 
app.listen(config.port, err => {
  console.log('Server connected at port: ' + config.port);
});

//test