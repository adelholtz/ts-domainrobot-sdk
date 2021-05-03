import {
    DomainRobot,
    DomainRobotException,
    DomainRobotModels,
    DomainRobotResult,
    JsonResponseDataContact
} from 'js-domainrobot-sdk'

import createDomainRobotInstance from './lib/DomainRobotInstance'

/**
 * @throws DomainRobotException
 * @returns Promise
 */
export default async function (): Promise<DomainRobotResult<JsonResponseDataContact,number>> {
    const domainRobot: DomainRobot = createDomainRobotInstance();

    // set contact data
    let contactModel: DomainRobotModels.Contact = new DomainRobotModels.Contact();
    contactModel.alias = "Test";
    contactModel.type = "PERSON",
    contactModel.city = "Regensburg";
    contactModel.country = "DE";
    contactModel.email = "asdfasdf@asdfasdf.de";
    contactModel.fname = "Test";
    contactModel.lname = "Nachname";
    contactModel.address = ["Some street 5"];
    contactModel.pcode = "93047";
    contactModel.phone = "+49-234-234";

    const result: DomainRobotResult<JsonResponseDataContact, number> = await domainRobot.contact().create(contactModel);

    return result;
}