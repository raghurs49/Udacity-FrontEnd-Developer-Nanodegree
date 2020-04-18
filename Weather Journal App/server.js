/* Empty JS object to act as endpoint for all routes */
const projectData = [];

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 5000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// GET route
app.get('/all', sendData);
function sendData (request, response) {
  response.send(projectData);
};

// POST route
// app.post('/add', callBack);
// function callBack(req,res){
//   res.send('POST received');
// }
app.post('/add', callBack);
function callBack (req,res){
    projectData.push(req.body);
    res.send(true);
};


  
