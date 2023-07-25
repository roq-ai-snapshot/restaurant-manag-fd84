import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface SeatingLayoutInterface {
  id?: string;
  layout_name: string;
  restaurant_id?: string;
  created_at?: any;
  updated_at?: any;

  restaurant?: RestaurantInterface;
  _count?: {};
}

export interface SeatingLayoutGetQueryInterface extends GetQueryInterface {
  id?: string;
  layout_name?: string;
  restaurant_id?: string;
}
