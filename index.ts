import express from 'express'
// third party imports
import dotenv from 'dotenv'
import { path } from 'ramda'

// custom imports
import { DomainRobot, DomainRobotResult, DomainRobotModels, JsonResponseDataContact, DomainRobotException, JsonResponseDataPollMessage } from 'js-domainrobot-sdk'
import ContactCreate from './src/ContactCreate'
import ContactListInquire from './src/ContactList'
import {confirm, poll} from './src/Polling'
import createDomainRobotInstance from './src/lib/DomainRobotInstance'
dotenv.config();

const app = express()
const port = process.env.APP_PORT


// basic route for testing purposes
app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/domain/:domain', async(req, res) => {
    const domainRobot: DomainRobot = createDomainRobotInstance();
    let result;
    try {
        result = await domainRobot.domain().info(req.params.domain)
    } catch (DomainRobotException) {
        result = DomainRobotException;
    }

    res.status(result.status).send(result)
})

// ------------------
// important routes 

app.get('/poll', async (req, res) => {
    let result: DomainRobotResult<JsonResponseDataPollMessage, number>
    // numer of messages in the polling queue
    let summary: number

    try {
        // check if we have messages in the PollMessage queue
        const pollResult = await poll()
        summary = path(['result', 'object', 'summary'], pollResult) || 0

        // every poll returns exactly 1 PollMessage if there is one waiting in the PollMessage queue
        const pollMesage: DomainRobotModels.PollMessage =
            path(['result', 'data', '0'], pollResult) || new DomainRobotModels.PollMessage()

        // ------
        // do something with the DomainRobotModels.PollMessage here
        // set a registered domain to ready in an interface for example
        // or inform your customer about the successfull update/create ...
        // ------

        // finally, to clear the message out of the PollMessage queue we need to confirm it
        // otherwise it will show up again and again
        // in this example we confirm the pollMessage regardless if we received a valid 
        // object back from the info() command
        // in this example if we don't get a valid message out of the queue we send a
        // confirm with the id 0. We get a message back saying that there was nothing to confirm
        // or that the message we wanted to confirm could not be found (http status code 400)
        result = await confirm(pollMesage)
    } catch (DomainRobotException) {
        result = DomainRobotException;
    }
    res.status(result.status).send(result)
})

app.get('/contact/create', async (req, res) => {
    let result: DomainRobotResult<JsonResponseDataContact, number> | DomainRobotException;

    try{
        result = await ContactCreate()
    }catch(DomainRobotException){
        result = DomainRobotException;
    }

    res.status(result.status).send(result);
})

app.get('/contactlist', async (req, res) => {
    let result: DomainRobotResult<JsonResponseDataContact, number> | DomainRobotException;

    try {
        result =  await ContactListInquire()
    } catch (DomainRobotException) {
        result = DomainRobotException;
    }

    res.status(result.status).send(result)
})

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
