import {tableSchema} from '@nozbe/watermelondb';

const SaleSchema = tableSchema({
  name: 'sales',
  columns: [
    {name: 'sale_id', type: 'string'},
    {name: 'sale_value', type: 'number'},
    {name: 'salesman', type: 'string'},
    {name: 'nearest_unit', type: 'string'},
    {name: 'board_salesman', type: 'string'},
    {name: 'latitude', type: 'string'},
    {name: 'longitude', type: 'string'},
    {name: 'roaming', type: 'number'},
    {name: 'date_of_sale', type: 'string'},
    {name: 'hour_of_sale', type: 'string'},
    {name: 'synced', type: 'boolean', isOptional: true},
  ],
});

export default SaleSchema;
