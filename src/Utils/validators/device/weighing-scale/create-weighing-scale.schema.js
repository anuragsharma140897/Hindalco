import { validationSchema } from "../../validationSchema";

export const weighingScaleSchema = {
  weighingScaleAction: validationSchema.string('Weighing Scale Action Field is Required')
    .min(3, 'Weighing Scale Action Field should be min 3 characters long'),
  weighingScaleBuildingId: validationSchema.string('Weighing Scale Building ID Field is Required')
    .min(3, 'Weighing Scale Building ID Field should be min 3 characters long'),
  weighingScaleFrequency: validationSchema.string('Weighing Scale Frequency Field is Required')
    .min(10, 'Weighing Scale Frequency Field should be min 10 characters long'),
  weighingScaleId: validationSchema.string('Weighing Scale ID Field is Required')
    .min(3, 'Weighing Scale ID Field should be min 3 characters long'),
  weighingScaleInfo: validationSchema.string('Weighing Scale Info Field is Required')
    .min(3, 'Weighing Scale Info Field should be min 3 characters long'),
  weighingScaleIp: validationSchema.string('Weighing Scale IP Field is Required')
    .min(3, 'Weighing Scale IP Field should be min 3 characters long'),
  weighingScaleMacId: validationSchema.string('Weighing Scale Mac Id Field is Required')
    .min(3, 'Weighing Scale Mac Id Field should be min 3 characters long'),
  weighingScaleName: validationSchema.string('Weighing Scale Name Field is Required')
    .min(1, 'Weighing Scale Name Field should be min 1 characters long'),
  weighingScalePassword: validationSchema.string('Weighing Scale Password Field is Required')
    .min(2, 'Weighing Scale Password Field should be min 2 characters long'),
  weighingScalePort: validationSchema.string('Weighing Scale Port Field is Required')
    .min(2, 'Weighing Scale Port Field should be min 2 characters long'),
  weighingScaleSerialNo: validationSchema.string('Weighing Scale Serial No Weight Field is Required')
    .min(2, 'Weighing Scale Serial No Weight Field should be min 2 characters long'),
  weighingScaleStatus: validationSchema.string('Weighing Scale Status Field is Required')
    .min(2, 'Weighing Scale Status Field should be min 2 characters long'),
  weighingScaleType: validationSchema.string('Weighing Scale Type Field is Required')
    .min(2, 'Weighing Scale Type Field should be min 2 characters long'),
  weighingScaleUsername: validationSchema.string('Weighing Scale Username Field is Required')
    .min(2, 'Weighing Scale Username Field should be min 2 characters long'),
  weighingScaleZoneId: validationSchema.string('Weighing Scale Zone ID Field is Required')
    .min(2, 'Weighing Scale Zone ID Field should be min 2 characters long'),


  // captureBatchNo: validationSchema.string('Width Field is Required')
  //   .min(3, 'Width Field should be min 3 characters long'),
  // captureLotNo: validationSchema.string('Width Field is Required')
  //   .min(3, 'Width Field should be min 3 characters long'),
};
