
export const CompileConfigurationJson = (data) => {

    const MyPromiss = new Promise((resolve, reject) => {

        var json = {
            "name": data?.name,
            "description": data?.description,
            "type": data?.type,
            "configuration": {
                "endpoint": {
                    "hostname": data?.endpointhostname,
                    "port": parseInt(data?.endpointhostport),
                    "protocol": data?.endpointhostprotocol,
                },
                "additional": {
                    "clientId": data?.additionalclientId,
                    "cleanSession": data?.additionalcleanSession === undefined ? false : data?.additionalcleanSession,
                    "keepAlive": parseInt(data?.additionalalive),
                    "debug": data?.additionaldebug === undefined ? false : data?.additionaldebug,
                },
                "topics": {
                    "tagEvents": {
                        "topic": data?.tagEventsTopic,
                        "qos": parseInt(data?.tagEventsqos),
                        "retain": data?.tagEventsretain === undefined ? false : data?.tagEventsretain,
                    },
                    "managementEvents": {
                        "topic": data?.managementEventsTopic,
                        "qos": parseInt(data?.managementEventsqos),
                        "retain": data?.managementEventsretain === undefined ? false : data?.managementEventsretain,
                    },
                    "management": {
                        "command": {
                            "topic": data?.managementcommandTopic,
                            "qos": parseInt(data?.managementcommandqos),
                            "retain": data?.managementcommandretain === undefined ? false : data?.managementcommandretain,
                        },
                        "response": {
                            "topic": data?.managementresponseTopic,
                            "qos": parseInt(data?.managementresponseqos),
                            "retain": data?.managementresponseretain === undefined ? false : data?.managementresponseretain,
                        }
                    },
                    "control": {
                        "command": {
                            "topic": data?.controlcommandTopic,
                            "qos": parseInt(data?.controlcommandqos),
                            "retain": data?.controlcommandretain === undefined ? false : data?.controlcommandretain,
                        },
                        "response": {
                            "topic": data?.controlresponseTopic,
                            "qos": parseInt(data?.controlresponseqos),
                            "retain": data?.controlresponseretain === undefined ? false : data?.controlresponseretain,
                        }
                    }
                }
            }
        }

        resolve(json)

    })

    return MyPromiss;
}