import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-root', standalone: true, imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], templateUrl: './app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
  constructor(public readonly auth: AuthService, private readonly router: Router) {}
  sair(): void { this.auth.logout(); this.router.navigate(['/']); }
}
