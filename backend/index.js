const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const { SageMakerClient, AddAssociationCommand } = require("@aws-sdk/client-sagemaker")
const router = require('express').Router()
app.use(bodyParser.json())

const client = new SageMakerClient({region: ""})

router.post('/output', async (req,res) => {
    try{
        let param = await ser
    }
})



app.listen(3000, () => {
    console.log("Server started at port 3000")
})