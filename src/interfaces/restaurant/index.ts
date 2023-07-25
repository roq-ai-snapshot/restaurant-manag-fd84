import { MenuInterface } from 'interfaces/menu';
import { OperationalHoursInterface } from 'interfaces/operational-hours';
import { SeatingLayoutInterface } from 'interfaces/seating-layout';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RestaurantInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  menu?: MenuInterface[];
  operational_hours?: OperationalHoursInterface[];
  seating_layout?: SeatingLayoutInterface[];
  user?: UserInterface;
  _count?: {
    menu?: number;
    operational_hours?: number;
    seating_layout?: number;
  };
}

export interface RestaurantGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
