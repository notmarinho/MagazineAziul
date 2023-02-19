import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {SaleModel} from '../../models/Sale';
import migrations from './model/migrations';
import schema from './model/schema';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
});

const database = new Database({
  adapter,
  modelClasses: [SaleModel],
});

export default database;
