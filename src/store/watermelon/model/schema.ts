import {appSchema} from '@nozbe/watermelondb';

import SaleSchema from '../tablesSchema/SaleSchema';

export default appSchema({
  version: 1,
  tables: [SaleSchema],
});
