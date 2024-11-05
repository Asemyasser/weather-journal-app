// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

// Add GET route that returns projectData object in the server code
app.get("/get", (req, res) => {
  res.send(projectData);
});

// Add post route
app.post("/sendData", (req, res) => {
  projectData.push(req.body);

  res.send({ message: "Data received successfully", data: projectData });
});
