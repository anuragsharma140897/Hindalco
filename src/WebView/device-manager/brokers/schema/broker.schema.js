import { validationSchema } from "../utils/validation-schema";

export const brokerScheema = {
    brokerIp: validationSchema?.string('Broker ip is Required'),
    // brokerType :validationSchema?.string('Broker Type is Required'),
    brokerPort :validationSchema?.string('Broker Port is Required'),
};
