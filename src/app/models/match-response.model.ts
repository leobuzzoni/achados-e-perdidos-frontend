import { MatchStatus } from './match-status.enum';
import { ItemResponse } from './item-response.model';

export interface MatchResponse {
  id: number;
  lostItem: ItemResponse;
  foundItem: ItemResponse;
  score: number;
  status: MatchStatus;
  createdAt: string;
}
