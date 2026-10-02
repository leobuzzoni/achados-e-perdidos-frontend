import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ObjetoService } from '../../services/objeto.service';
import { ItemResponse } from '../../models/item-response.model';
import { MatchResponse } from '../../models/match-response.model';
import { DatePtPipe } from '../../utils/date-pt.pipe';
import { ImageUrlPipe } from '../../utils/image-url.pipe';

@Component({
  selector: 'app-detalhe-objeto',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePtPipe, ImageUrlPipe],
  templateUrl: './detalhe-objeto.component.html',
  styleUrls: ['./detalhe-objeto.component.css']
})
export class DetalheObjetoComponent implements OnInit {
  objeto?: ItemResponse;
  matches: MatchResponse[] = [];
  carregando = true;
  erro = '';

  constructor(private readonly route: ActivatedRoute, private readonly service: ObjetoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.erro = 'Identificador inválido.'; this.carregando = false; return; }
    this.service.buscarPorId(id).subscribe({
      next: item => {
        this.objeto = item;
        this.carregando = false;
        this.service.listarMatches(id).subscribe({ next: matches => this.matches = matches });
      },
      error: () => { this.erro = 'Objeto não encontrado.'; this.carregando = false; }
    });
  }
}
