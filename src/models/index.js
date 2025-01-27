// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Staff, Shift } = initSchema(schema);

export {
  Todo,
  Staff,
  Shift
};