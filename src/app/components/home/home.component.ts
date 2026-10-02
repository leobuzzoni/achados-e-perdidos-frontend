import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ObjetoService } from '../../services/objeto.service';
import { ItemResponse } from '../../models/item-response.model';
import { ItemType } from '../../models/item-type.enum';
import { ItemStatus } from '../../models/item-status.enum';
import { ImageUrlPipe } from '../../utils/image-url.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageUrlPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  objetos: ItemResponse[] = [];
  erro = '';

  constructor(private readonly service: ObjetoService) {}

  ngOnInit(): void {
    this.service.listar({ status: ItemStatus.ATIVO }).subscribe({
      next: items => this.objetos = items.slice(0, 3),
      error: () => this.erro = 'Não foi possível carregar as publicações.'
    });
  }

  labelTipo(type: ItemType): string {
    return type === ItemType.PERDIDO ? 'Perdido' : 'Encontrado';
  }
}
