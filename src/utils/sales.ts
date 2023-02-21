import type Sale from '@models/Sale';
import type {Menu} from '@services/types';

import type {UnityCoordsLocation} from '../constants/unitiesLocations';
import unitiesLocations from '../constants/unitiesLocations';

const getUnitiesDataFromSales = (sales: Sale[], unities: Menu['units'] = []) =>
  unities
    .map(unit => {
      const unitSales = sales.filter(sale => sale.nearest_unit === unit);
      const unitSaleAmount = unitSales.reduce(
        (acc, sale) => acc + sale.sale_value,
        0,
      );

      return {
        unit,
        coords: unitiesLocations[unit as UnityCoordsLocation],
        sales_amount: unitSaleAmount,
      };
    })
    .sort((a, b) => b.sales_amount - a.sales_amount);

export default getUnitiesDataFromSales;
