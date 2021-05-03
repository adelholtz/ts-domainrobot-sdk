import {
    DomainRobot,
    DomainRobotModels,
    DomainRobotResult,
    JsonResponseDataContact
} from 'js-domainrobot-sdk'

import createDomainRobotInstance from './lib/DomainRobotInstance'

export default async function (): Promise<DomainRobotResult<JsonResponseDataContact, number>>{
    const domainRobot: DomainRobot = createDomainRobotInstance();

    let queryFilter = new DomainRobotModels.QueryFilter({
        key: 'pcode',
        value: '93%',
        operator: 'LIKE',
    })
    let query = new DomainRobotModels.Query({
        filters: [queryFilter],
        view: {
            children: true,
        },
    })

    const result: DomainRobotResult<JsonResponseDataContact, number> = await domainRobot.contact().list(query)

    return result
}