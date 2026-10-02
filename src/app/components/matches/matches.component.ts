import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ObjetoService } from '../../services/objeto.service';
import { MatchResponse } from '../../models/match-response.model';
import { ImageUrlPipe } from '../../utils/image-url.pipe';

@Component({ selector: 'app-matches', standalone: true, imports: [CommonModule, RouterLink, ImageUrlPipe], templateUrl: './matches.component.html', styleUrls: ['./matches.component.css'] })
export class MatchesComponent implements OnInit {
  matches: MatchResponse[] = []; erro = ''; carregando = true;
  constructor(private readonly service: ObjetoService) {}
  ngOnInit(): void {
    this.service.meusItens().subscribe({
      next: items => {
        if (!items.length) { this.carregando = false; return; }
        let remaining = items.length; const all: MatchResponse[] = [];
        items.forEach(item => this.service.listarMatches(item.id).subscribe({
          next: matches => { all.push(...matches); if (--remaining === 0) { this.matches = [...new Map(all.map(m => [m.id, m])).values()]; this.carregando = false; } },
          error: () => { if (--remaining === 0) this.carregando = false; }
        }));
      }, error: () => { this.erro = 'Não foi possível carregar seus matches.'; this.carregando = false; }
    });
  }
  confirmar(match: MatchResponse): void { this.service.confirmarMatch(match.id).subscribe({ next: updated => match.status = updated.status }); }
  rejeitar(match: MatchResponse): void { this.service.rejeitarMatch(match.id).subscribe({ next: updated => match.status = updated.status }); }
}
