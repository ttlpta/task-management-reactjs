import {
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { schema } from 'normalizr';

export const taskAdapter = createEntityAdapter();

export default new schema.Entity('task');