// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Staff, Shift, Reservation } = initSchema(schema);

export {
  Staff,
  Shift,
  Reservation
};