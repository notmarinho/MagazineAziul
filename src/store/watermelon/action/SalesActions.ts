import {SalesService} from '@services/sales';
import type {FilterSalesParams} from '@services/types';
import {isSameDayOrAfter, isSameDayOrBefore} from '@utils/date';

import type {SaleModel} from '../../../models/Sale';
import type Sale from '../../../models/Sale';
import database from '..';

const salesCollection = database.collections.get<SaleModel>('sales');

const WMSalesActions = {
  async addSale(sale: Sale) {
    return database.write(
      async () =>
        await salesCollection.create(newItem => {
          newItem.sale_id = sale.sale_id;
          newItem.sale_value = sale.sale_value;
          newItem.salesman = sale.salesman;
          newItem.nearest_unit = sale.nearest_unit;
          newItem.board_salesman = sale.board_salesman;
          newItem.latitude = sale.latitude;
          newItem.longitude = sale.longitude;
          newItem.roaming = sale.roaming;
          newItem.date_of_sale = sale.date_of_sale;
          newItem.synced = !!sale.sale_id;
        }),
    );
  },

  async addServeSalesLocally(sales: Sale[]) {
    database.write(async () => {
      database.batch(
        sales.map(sale =>
          salesCollection.prepareCreate(newItem => {
            newItem.sale_id = sale.sale_id;
            newItem.sale_value = sale.sale_value;
            newItem.salesman = sale.salesman;
            newItem.nearest_unit = sale.nearest_unit;
            newItem.board_salesman = sale.board_salesman;
            newItem.latitude = sale.latitude;
            newItem.longitude = sale.longitude;
            newItem.roaming = sale.roaming;
            newItem.date_of_sale = sale.date_of_sale;
            newItem.synced = true;
          }),
        ),
      );
    });
  },

  async getSales() {
    const syncedSales = await salesCollection.query().fetch();

    return syncedSales;
  },

  async filterSales(filterParams: FilterSalesParams) {
    let filteredSales = await salesCollection.query().fetch();

    if (filterParams.board) {
      filteredSales = filteredSales.filter(
        sale => sale.board_salesman === filterParams.board,
      );
    }
    if (filterParams.salesman) {
      filteredSales = filteredSales.filter(
        sale => sale.salesman === filterParams.salesman,
      );
    }

    if (filterParams.unit) {
      filteredSales = filteredSales.filter(
        sale => sale.nearest_unit === filterParams.unit,
      );
    }

    if (filterParams.start_date) {
      filteredSales = filteredSales.filter(sale =>
        isSameDayOrAfter(sale.getDate(), filterParams.start_date!),
      );
    }

    if (filterParams.end_date) {
      filteredSales = filteredSales.filter(sale =>
        isSameDayOrBefore(sale.getDate(), filterParams.end_date!),
      );
    }
    return filteredSales;
  },

  observerSales() {
    return salesCollection.query().observe();
  },

  async removeSales() {
    const sales = await salesCollection.query().fetch();

    return database.write(
      async () =>
        await database.batch(
          sales.map(sale => sale.prepareDestroyPermanently()),
        ),
    );
  },

  async syncNotSyncedSales(notSyncedSales: SaleModel[]) {
    await Promise.all(
      notSyncedSales.map(async sale => {
        const saleData = await SalesService.insertSale(sale.getServerFields());
        await database.write(async () => {
          await sale.update(saleItem => {
            saleItem.sale_id = saleData.sale_id;
            saleItem.synced = true;
            saleItem.nearest_unit = saleData.nearest_unit;
            saleItem.board_salesman = saleData.board_salesman;
            saleItem.roaming = saleData.roaming;
            saleItem.date_of_sale = saleData.date_of_sale;
            saleItem.hour_of_sale = saleData.hour_of_sale;
            saleItem.salesman = saleData.salesman;
          });
        });
      }),
    );
  },
};

export default WMSalesActions;
