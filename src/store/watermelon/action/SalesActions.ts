import NetInfo from '@react-native-community/netinfo';

import {Q} from '@nozbe/watermelondb';
import {SalesService} from '@services/sales';

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
          newItem.unit = sale.unit;
          newItem.board_salesman = sale.board_salesman;
          newItem.latitude = sale.latitude;
          newItem.longitude = sale.longitude;
          newItem.roaming = sale.roaming;
          newItem.date_of_sale = sale.date_of_sale;
          newItem.synced = !!sale.sale_id;
        }),
    );
  },

  async addServeSales(sales: Sale[]) {
    database.write(async () => {
      database.batch(
        sales.map(sale =>
          salesCollection.prepareCreate(newItem => {
            newItem.sale_id = sale.sale_id;
            newItem.sale_value = sale.sale_value;
            newItem.salesman = sale.salesman;
            newItem.unit = sale.unit;
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

  async syncLocalSalesWithServer() {
    try {
      const hasInternet = await NetInfo.fetch().then(
        state => !!state.isConnected,
      );

      if (!hasInternet) {
        throw new Error('Offline Mode');
      }

      console.log('Sync Started 🔋');
      const apiSales = await SalesService.getSales().then(
        response => response.sales,
      );

      let localSales = await salesCollection.query().fetch();

      const notSyncedSales = await salesCollection
        .query(Q.where('synced', false))
        .fetch();
      const hasNotSyncedSales = notSyncedSales.length > 0;

      if (hasNotSyncedSales) {
        console.log('Sync Local With Server 🚚');
        await Promise.all(
          notSyncedSales.map(async sale => {
            const saleData = await SalesService.insertSale(
              sale.getServerFields(),
            );
            await database.write(async () => {
              await sale.update(saleItem => {
                saleItem.sale_id = saleData.sale_id;
                saleItem.synced = true;
                saleItem.unit = saleData.unit;
                saleItem.board_salesman = saleData.board_salesman;
                saleItem.roaming = saleData.roaming;
                saleItem.date_of_sale = saleData.date_of_sale;
                saleItem.hour_of_sale = saleData.hour_of_sale;
                saleItem.salesman = saleData.salesman;
              });
            });
          }),
        );
      }

      // Adding new sales from server to local database
      const serverSales = apiSales.filter(
        apiSale =>
          !localSales.find(localSale => localSale.sale_id === apiSale.sale_id),
      );
      const hasNewSales = serverSales.length > 0;

      if (hasNewSales) {
        await this.addServeSales(serverSales).then(() =>
          console.log('New sales added to local database 📲'),
        );
      }

      console.log('Sync Completed ✅');
    } catch (error: any) {
      if (error.message === 'Offline Mode') {
        console.log(`${error.message} 🚨`);
      }
    }
  },
};

export default WMSalesActions;