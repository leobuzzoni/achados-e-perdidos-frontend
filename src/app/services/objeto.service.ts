import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemRequest } from '../models/item-request.model';
import { ItemResponse } from '../models/item-response.model';
import { ItemType } from '../models/item-type.enum';
import { ItemCategory } from '../models/item-category.enum';
import { ItemStatus } from '../models/item-status.enum';
import { MatchResponse } from '../models/match-response.model';

@Injectable({ providedIn: 'root' })
export class ObjetoService {
  private readonly apiUrl = '/api/v1';

  constructor(private readonly http: HttpClient) {}

  criar(request: ItemRequest): Observable<ItemResponse> {
    return this.http.post<ItemResponse>(`${this.apiUrl}/items`, request);
  }

  listar(filtros?: {
    type?: ItemType;
    category?: ItemCategory;
    status?: ItemStatus;
    color?: string;
  }): Observable<ItemResponse[]> {
    let params = new HttpParams();
    if (filtros?.type) params = params.set('type', filtros.type);
    if (filtros?.category) params = params.set('category', filtros.category);
    if (filtros?.status) params = params.set('status', filtros.status);
    if (filtros?.color) params = params.set('color', filtros.color);
    return this.http.get<ItemResponse[]>(`${this.apiUrl}/items`, { params });
  }

  meusItens(): Observable<ItemResponse[]> {
    return this.http.get<ItemResponse[]>(`${this.apiUrl}/items/me`);
  }

  buscarPorId(id: number): Observable<ItemResponse> {
    return this.http.get<ItemResponse>(`${this.apiUrl}/items/${id}`);
  }

  atualizar(id: number, request: ItemRequest): Observable<ItemResponse> {
    return this.http.put<ItemResponse>(`${this.apiUrl}/items/${id}`, request);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${id}`);
  }

  resolver(id: number): Observable<ItemResponse> {
    return this.http.patch<ItemResponse>(`${this.apiUrl}/items/${id}/resolve`, {});
  }

  adicionarImagem(id: number, file: File): Observable<ItemResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ItemResponse>(`${this.apiUrl}/items/${id}/images`, formData);
  }

  listarMatches(itemId: number): Observable<MatchResponse[]> {
    return this.http.get<MatchResponse[]>(`${this.apiUrl}/items/${itemId}/matches`);
  }

  confirmarMatch(matchId: number): Observable<MatchResponse> {
    return this.http.patch<MatchResponse>(`${this.apiUrl}/matches/${matchId}/confirm`, {});
  }

  rejeitarMatch(matchId: number): Observable<MatchResponse> {
    return this.http.patch<MatchResponse>(`${this.apiUrl}/matches/${matchId}/reject`, {});
  }
}
