import express from 'express'
const app = express()
const port = 8080 // default port to listen

import {
    DomainRobot,
    DomainRobotModels,
    DomainRobotResult,
    JsonResponseDataDomain
} from 'js-domainrobot-sdk'

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/domainlist', async (req, res) => {
    let domainRobot = new DomainRobot({
        url: 'https://api.demo.autodns.com/v1',
        auth: {
            user: 'root',
            password: 'test',
            context: 1,
        },
    })

    let queryFilter = new DomainRobotModels.QueryFilter({
        key: 'sld',
        value: 'example%',
        operator: 'LIKE',
    })
    let query = new DomainRobotModels.Query({
        filters: [queryFilter],
        view: {
            children: true,
        },
    })

    let result: DomainRobotResult<JsonResponseDataDomain, Number>

    try {
        result = await domainRobot.domain().cancelationList(query);
        //result = await domainRobot.domain().info("blub.de")
        console.log(result);
    } catch (DomainRobotException) {
        result = DomainRobotException;
    }

    res.send(result)
})

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
