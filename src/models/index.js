// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Staff, Shift, Reservation, Questionnaire, MedicalRecord } = initSchema(schema);

export {
  Todo,
  Staff,
  Shift,
  Reservation,
  Questionnaire,
  MedicalRecord
};