import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ObjetoService } from '../../services/objeto.service';
import { ItemResponse } from '../../models/item-response.model';
import { ItemType } from '../../models/item-type.enum';
import { ItemCategory } from '../../models/item-category.enum';
import { ImageUrlPipe } from '../../utils/image-url.pipe';

@Component({
  selector: 'app-objetos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ImageUrlPipe],
  templateUrl: './objetos.component.html',
  styleUrls: ['./objetos.component.css']
})
export class ObjetosComponent implements OnInit {
  objetos: ItemResponse[] = [];
  busca = '';
  tipo: 'TODOS' | ItemType = 'TODOS';
  categoria: 'TODAS' | ItemCategory = 'TODAS';
  carregando = true;
  erro = '';

  readonly categorias = [
    'TODAS', ...Object.values(ItemCategory)
  ] as Array<'TODAS' | ItemCategory>;

  constructor(private readonly service: ObjetoService) {}

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: items => {
        this.objetos = items;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os objetos.';
        this.carregando = false;
      }
    });
  }

  get filtrados(): ItemResponse[] {
    const termo = this.busca.trim().toLowerCase();
    return this.objetos.filter(objeto => {
      const texto = `${objeto.title} ${objeto.description ?? ''} ${objeto.locationDescription ?? ''}`.toLowerCase();
      return (!termo || texto.includes(termo))
        && (this.tipo === 'TODOS' || objeto.type === this.tipo)
        && (this.categoria === 'TODAS' || objeto.category === this.categoria);
    });
  }
}
