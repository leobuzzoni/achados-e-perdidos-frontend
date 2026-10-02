import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ObjetoService } from '../../services/objeto.service';
import { AuthUser } from '../../models/auth.model';

@Component({ selector: 'app-perfil', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './perfil.component.html', styleUrls: ['./perfil.component.css'] })
export class PerfilComponent implements OnInit {
  usuario: AuthUser | null = null; publicacoes = 0; matches = 0;
  constructor(private readonly auth: AuthService, private readonly service: ObjetoService) {}
  ngOnInit(): void {
    this.usuario = this.auth.getUser();
    this.service.meusItens().subscribe({ next: items => {
      this.publicacoes = items.length; if (!items.length) return;
      let remaining = items.length; const ids = new Set<number>();
      items.forEach(item => this.service.listarMatches(item.id).subscribe({
        next: matches => { matches.forEach(match => ids.add(match.id)); if (--remaining === 0) this.matches = ids.size; },
        error: () => { if (--remaining === 0) this.matches = ids.size; }
      }));
    }});
  }
  sair(): void { this.auth.logout(); location.href = '/'; }
}
