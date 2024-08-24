import { validationSchema } from "../../validationSchema";

export const deviceReaderSchema = {
  placementName: validationSchema.string('Placement Name Field is Required')
    .min(3, 'Placement Name Field should be min 3 characters long'),
  readerTypeName: validationSchema.string('Reader Type Name Field is Required')
    .min(3, 'Reader Type Name Field should be min 3 characters long'),
  readerAction: validationSchema.string('Reader Action Field is Required')
    .min(10, 'Reader Action Field should be min 10 characters long'),
  frequency: validationSchema.string('Frequency Field is Required')
    .min(3, 'Frequency Field should be min 3 characters long'),
  port: validationSchema.string('Port Field is Required')
    .min(3, 'Port Field should be min 3 characters long'),
  status: validationSchema.string('Status Field is Required')
    .min(3, 'Status Field should be min 3 characters long'),
  readerInfo: validationSchema.string('Reader Info Field is Required')
    .min(3, 'Reader Info Field should be min 3 characters long'),
  serialNo: validationSchema.string('Serial No Field is Required')
    .min(1, 'Serial No Field should be min 1 characters long'),
  bulidingId: validationSchema.string('Building ID Field is Required')
    .min(2, 'Building ID Field should be min 2 characters long'),
  zoneId: validationSchema.string('Zone ID Field is Required')
    .min(2, 'Zone ID Field should be min 2 characters long'),
  macId: validationSchema.string('MAC ID Weight Field is Required')
    .min(2, 'MAC ID Weight Field should be min 2 characters long'),
  readerIp: validationSchema.string('Reader IP Field is Required')
    .min(2, 'Reader IP Field should be min 2 characters long'),
  weighingScaleId: validationSchema.string('Weighing Scale ID Field is Required')
    .min(2, 'Weighing Scale ID Field should be min 2 characters long'),
  readerUsername: validationSchema.string('Reader Username Field is Required')
    .min(2, 'Reader Username Field should be min 2 characters long'),
  readerPassword: validationSchema.string('Reader Password Field is Required')
    .min(2, 'Reader Password Field should be min 2 characters long'),
  antenna1: validationSchema.json('Antenna 1 Field is Required')
    .required('Antenna 1 Field is Required')
    .refine((parsedValue) => {
      // Allowed values for antennaAction
      const allowedActions = ['on', 'off', 'entry']; // Add any other valid values here
      // Check if antennaAction is one of the allowed values
      return allowedActions.includes(parsedValue.antennaAction);
    }, { message: 'Antenna 1 must contain "antennaAction" with the value "on", "off", or empty' }),
  antenna2: validationSchema.json('Antenna 1 Field is Required')
    .required('Antenna 2 Field is Required')
    .refine((parsedValue) => {
      // Allowed values for antennaAction
      const allowedActions = ['on', 'off', 'entry']; // Add any other valid values here
      // Check if antennaAction is one of the allowed values
      return allowedActions.includes(parsedValue.antennaAction);
    }, { message: 'Antenna 2 must contain "antennaAction" with the value "on", "off", or empty' }),
  antenna3: validationSchema.json('Antenna 1 Field is Required')
    .required('Antenna 3 Field is Required')
    .refine((parsedValue) => {
      // Allowed values for antennaAction
      const allowedActions = ['on', 'off', 'entry']; // Add any other valid values here
      // Check if antennaAction is one of the allowed values
      return allowedActions.includes(parsedValue.antennaAction);
    }, { message: 'Antenna 3 must contain "antennaAction" with the value "on", "off", or empty' }),
  antenna4: validationSchema.json('Antenna 1 Field is Required')
    .required('Antenna 4 Field is Required')
    .refine((parsedValue) => {
      // Allowed values for antennaAction
      const allowedActions = ['on', 'off', 'entry']; // Add any other valid values here
      // Check if antennaAction is one of the allowed values
      return allowedActions.includes(parsedValue.antennaAction);
    }, { message: 'Antenna 4 must contain "antennaAction" with the value "on", "off", or empty' }),
};
