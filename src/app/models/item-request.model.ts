import { ItemCategory } from './item-category.enum';
import { ItemType } from './item-type.enum';

export interface ItemRequest {
  title: string;
  description?: string;
  type: ItemType;
  category: ItemCategory;
  color?: string;
  occurredAt: string;
  latitude?: number;
  longitude?: number;
  locationAddress?: string;
  locationDescription?: string;
}
