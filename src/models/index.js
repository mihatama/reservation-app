// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Staff, Shift, Reservation } = initSchema(schema);

export {
  Todo,
  Staff,
  Shift,
  Reservation
};