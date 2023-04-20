const express = require('express')
const app = express()
const { SageMakerClient } = require("@aws-sdk/client-sagemaker")

// create a new AWS SageMaker Runtime client
const sagemaker = new AWS.SageMakerRuntime({
    apiVersion: '2017-05-13',
    region: 'us-east-1'
  });
  
  // define the endpoint name of your deployed ML model on SageMaker
  const endpointName = 'your-SageMaker-endpoint-name';
  
  // define your POST request handler function
  exports.predictPrice = async (req, res) => {
    // get the data points from the frontend
    const { dataPoints } = req.body;
  
    try {
      // send a POST request to the SageMaker endpoint with the data points
      const response = await sagemaker.invokeEndpoint({
        EndpointName: endpointName,
        Body: JSON.stringify(dataPoints),
        ContentType: 'application/json',
        Accept: 'application/json'
      }).promise();
  
      // parse the response from SageMaker and send it back to the frontend
      const predictedPrice = JSON.parse(response.Body.toString('utf-8'));
      res.json({ predictedPrice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to predict price.' });
    }
  };

  app.listen(3000, function(){
    console.log("Server started at port 3000")
})