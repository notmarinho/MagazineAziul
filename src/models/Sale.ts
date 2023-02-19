import {Model} from '@nozbe/watermelondb';
import {field, text} from '@nozbe/watermelondb/decorators';

type Sale = {
  readonly sale_id?: string;
  longitude: string;
  latitude: string;
  sale_value: number;
  salesman?: string;
  unit?: string;
  board_salesman?: string;
  roaming?: number;
  date_of_sale?: string;
  hour_of_sale?: string;
  synced?: boolean;
};

export class SaleModel extends Model implements Sale {
  static table = 'sales';

  @field('latitude') latitude!: string;
  @field('longitude') longitude!: string;
  @field('sale_value') sale_value!: number;
  @field('sale_id') sale_id?: string;
  @text('salesman') salesman?: string;
  @field('unit') unit?: string;
  @field('board_salesman') board_salesman?: string;
  @field('roaming') roaming?: number;
  @field('date_of_sale') date_of_sale?: string;
  @field('hour_of_sale') hour_of_sale?: string;
  @field('synced') synced?: boolean;

  // Return only the fields that are needed to be sent to the server
  getServerFields() {
    const {sale_value, latitude, longitude} = this;
    return {
      sale_value: String(sale_value),
      latitude,
      longitude,
    };
  }

  // Return only the fields that are needed to be sent to the server
  getData(): Sale {
    const {
      latitude,
      longitude,
      sale_value,
      salesman,
      unit,
      board_salesman,
      roaming,
      date_of_sale,
      hour_of_sale,
      synced,
    } = this;

    return {
      latitude,
      longitude,
      sale_value,
      salesman,
      unit,
      board_salesman,
      roaming,
      date_of_sale,
      hour_of_sale,
      synced,
    };
  }
}

export default Sale;
