const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 4000;
const corsOptions = {
  origin: 'http://localhost:3000'
};  
app.use(cors(corsOptions));

// configure AWS SDK
AWS.config.update({ region: 'us-east-1' });

// create SageMakerRuntime client
const sagemakerRuntime = new AWS.SageMakerRuntime();

// middleware to parse incoming JSON requests
app.use(bodyParser.json());

// in-memory data storage
let myData = null;

// POST handler for incoming data
app.post('/', async (req, res) => {
  try {
    // parse the incoming JSON data
    const data = req.body;
    console.log('Received JSON package from frontend:', data);

    // store the data in-memory
    myData = data;

    // send the data to the SageMaker endpoint
    const endpointName = 'my-sagemaker-endpoint';
    const contentType = 'application/json';
    const body = JSON.stringify(myData);

    const params = {
      Body: body,
      EndpointName: endpointName,
      ContentType: contentType
    };

    // invoke the SageMaker endpoint using async/await
    const result = await sagemakerRuntime.invokeEndpoint(params).promise();
    console.log(result);
    res.send('Data processed successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error processing data');
  }
});

// GET handler for retrieving data from SageMaker
app.get('/output', async (req, res) => {
  try {
    // check if data has been processed yet
    if (myData === null) {
      res.status(404).send('Data not found');
      return;
    }

    // retrieve data from the SageMaker endpoint
    const endpointName = 'my-sagemaker-endpoint';
    const contentType = 'application/json';
    const body = JSON.stringify(myData);

    const params = {
      Body: body,
      EndpointName: endpointName,
      ContentType: contentType
    };

    // invoke the SageMaker endpoint using async/await
    const result = await sagemakerRuntime.invokeEndpoint(params).promise();
    console.log(result);

    // send the retrieved data to the frontend
    res.send(result.Body.toString('utf-8'));
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data from SageMaker');
  }
});

// set up reverse proxy to forward requests from port 3000 to port 4000
//app.use('/', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
