import { DomainRobot } from "js-domainrobot-sdk"

export default function(): DomainRobot {
    // create domainrobot connection
    const domainRobot: DomainRobot = new DomainRobot({
        url: process.env.AUTODNS_URL,
        auth: {
            user: process.env.AUTODNS_USER || '',
            password: process.env.AUTODNS_PW || '',
            context: parseInt(process.env.AUTODNS_CONTEXT || '4'),
        },
        logRequestCallback: function (requestOptions: any, headers: any) {
            console.log(requestOptions, headers)
        },
    })

    return domainRobot
}