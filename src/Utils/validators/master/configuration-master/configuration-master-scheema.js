import { validationSchema } from "../../validationSchema";

export const configurationMasterSchema = {
    name: validationSchema.string('Name is required'),
    type: validationSchema.string('Type is required'),
    description: validationSchema.string('Description  is required'),
    managementEventsTopic: validationSchema.string('Topic  is required'),
    managementEventsqos: validationSchema.string('QOS  is required'),
    managementEventsretain: validationSchema.string('Retain  is required'),

    // tagEvents
    tagEventsTopic: validationSchema.string('Topic  is required'),
    tagEventsqos: validationSchema.string('QOS  is required'),
    tagEventsretain: validationSchema.string('Retain  is required'),

    //managementcommand 
    managementcommandTopic: validationSchema.string('Topic  is required'),
    managementcommandqos: validationSchema.string('QOS  is required'),
    managementcommandretain: validationSchema.string('Retain  is required'),

    //managementresponse
    managementresponseTopic: validationSchema.string('Topic  is required'),
    managementresponseqos: validationSchema.string('QOS  is required'),
    managementresponseretain: validationSchema.string('Retain  is required'),

    //controlcommand
    controlcommandTopic: validationSchema.string('Topic  is required'),
    controlcommandqos: validationSchema.string('QOS  is required'),
    controlcommandretain: validationSchema.string('Retain  is required'),

    //controlresponse
    controlresponseTopic: validationSchema.string('Topic  is required'),
    controlresponseqos: validationSchema.string('QOS  is required'),
    controlresponseretain: validationSchema.string('Retain  is required'),

    //endpoint
    endpointhostname: validationSchema.string('Hostname  is required'),
    endpointhostport: validationSchema.string('Port  is required'),
    endpointhostprotocol: validationSchema.string('Protocol  is required'),

    //additional
    additionalclientId: validationSchema.string('Client Id  is required'),
    additionalalive: validationSchema.string('Client Alive is required'),



    






};
