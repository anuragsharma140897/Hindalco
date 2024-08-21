
export const CompileConfigurationJson = (data) => {

    const MyPromiss = new Promise((resolve, reject) => {

        var json = {
            "name": data?.name,
            "description": data?.description,
            "type": data?.type,
            "configuration": {
                "endpoint": {
                    "hostname": data?.endpointhostname,
                    "port":  data?.endpointhostport,
                    "protocol":  data?.endpointhostprotocol,
                },
                "additional": {
                    "clientId":  data?.additionalclientId,
                    "cleanSession":  data?.additionalcleanSession === undefined?false:data?.additionalcleanSession,
                    "keepAlive":  data?.additionalalive,
                    "debug":  data?.additionaldebug === undefined ? false : data?.additionaldebug,
                },
                "topics": {
                    "tagEvents": {
                        "topic": data?.tagEventsTopic,
                        "qos":  data?.tagEventsqos,
                        "retain":  data?.tagEventsretain,
                    },
                    "managementEvents": {
                        "topic": data?.managementEventsTopic,
                        "qos": data?.managementEventsqos,
                        "retain": data?.managementEventsretain,
                    },
                    "management": {
                        "command": {
                            "topic": data?.managementcommandTopic,
                            "qos": data?.managementcommandTopic,
                            "retain": data?.managementcommandretain,
                        },
                        "response": {
                            "topic": data?.managementresponseTopic,
                            "qos": data?.managementresponseTopic,
                            "retain": data?.managementresponseretain,
                        }
                    },
                    "control": {
                        "command": {
                            "topic": data?.controlcommandTopic,
                            "qos": data?.controlcommandqos,
                            "retain": data?.controlcommandretain,
                        },
                        "response": {
                            "topic": data?.managementresponseTopic,
                            "qos": data?.managementresponseTopic,
                            "retain": data?.managementresponseretain,
                        }
                    }
                }
            }
        }

        resolve(json)

    })

    return MyPromiss;
}