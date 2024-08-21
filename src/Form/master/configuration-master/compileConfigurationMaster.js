
export const CompileConfigurationMaster = (data) => {

    const MyPromiss = new Promise((resolve, reject) => {

        var json = {
            "name": data?.name,
            "description": data?.description,
            "type": data?.type,
            "endpointhostname": data?.configuration?.endpoint?.hostname,
            "endpointhostport": data?.configuration?.endpoint?.port,
            "endpointhostprotocol": data?.configuration?.endpoint?.protocol,
            "additionalclientId": data?.configuration?.additional?.clientId,
            "additionalcleanSession": data?.configuration?.additional?.cleanSession,
            "additionalalive": data?.configuration?.additional?.keepAlive,
            "additionaldebug": data?.configuration?.additional?.debug,
            "tagEventsTopic": data?.configuration?.topics?.tagEvents?.topic,
            "tagEventsqos": data?.configuration?.topics?.tagEvents?.qos,
            "tagEventsretain": data?.configuration?.topics?.tagEvents?.retain,
            "managementEventsTopic": data?.configuration?.topics?.managementEvents?.topic,
            "managementEventsqos": data?.configuration?.topics?.managementEvents?.qos,
            "managementEventsretain": data?.configuration?.topics?.managementEvents?.retain,
            "managementcommandTopic": data?.configuration?.topics?.management?.command?.topic,
            "managementcommandqos": data?.configuration?.topics?.management?.command?.qos,
            "managementcommandretain": data?.configuration?.topics?.management?.command?.retain,
            "managementresponseTopic": data?.configuration?.topics?.management?.response?.topic,
            "managementresponseqos": data?.configuration?.topics?.management?.response?.qos,
            "managementresponseretain": data?.configuration?.topics?.management?.response?.retain,
            "controlcommandTopic": data?.configuration?.topics?.control?.command?.topic,
            "controlcommandqos": data?.configuration?.topics?.control?.command?.qos,
            "controlcommandretain": data?.configuration?.topics?.control?.command?.retain,
            "controlresponseTopic": data?.configuration?.topics?.control?.response?.topic,
            "controlresponseqos": data?.configuration?.topics?.control?.response?.qos,
            "controlresponseretain": data?.configuration?.topics?.control?.response?.retain,
        }

        resolve(json)

    })

    return MyPromiss;
}