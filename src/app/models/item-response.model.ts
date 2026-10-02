import { ItemCategory } from './item-category.enum';
import { ItemStatus } from './item-status.enum';
import { ItemType } from './item-type.enum';

export interface ItemResponse {
  id: number;
  title: string;
  description: string | null;
  type: ItemType;
  category: ItemCategory;
  color: string | null;
  occurredAt: string;
  latitude: number | null;
  longitude: number | null;
  locationDescription: string | null;
  status: ItemStatus;
  ownerId: number;
  ownerName: string;
  imageUrls: string[];
  createdAt: string;
}
