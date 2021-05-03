import {
    DomainRobot,
    DomainRobotModels,
    DomainRobotResult,
    JsonResponseDataPollMessage,
    JsonResponseDataJsonNoData
} from 'js-domainrobot-sdk'

import {path} from 'ramda'

import createDomainRobotInstance from './lib/DomainRobotInstance'

const confirm = async (pollMessage: DomainRobotModels.PollMessage): Promise<DomainRobotResult<JsonResponseDataJsonNoData, number>> => {
    const domainRobot: DomainRobot = createDomainRobotInstance();

    const id: number = pollMessage.id || 0

    const confirmationResult: DomainRobotResult<JsonResponseDataJsonNoData, number> = await domainRobot.poll().confirm(id)

    return confirmationResult
}

const poll = async (): Promise<DomainRobotResult<JsonResponseDataPollMessage, number>> => {

    const domainRobot: DomainRobot = createDomainRobotInstance();

    let result: DomainRobotResult<JsonResponseDataPollMessage, number>
    result = await domainRobot.poll().info()

    return result
}

export {
    confirm,
    poll
}