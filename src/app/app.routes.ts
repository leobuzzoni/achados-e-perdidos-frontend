import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./components/auth/cadastro/cadastro.component').then(m => m.CadastroComponent)
  },
  {
    path: 'objetos',
    loadComponent: () => import('./components/objetos/objetos.component').then(m => m.ObjetosComponent)
  },
  {
    path: 'objetos/:id',
    loadComponent: () => import('./components/objetos/detalhe-objeto.component').then(m => m.DetalheObjetoComponent)
  },
  {
    path: 'publicar',
    canActivate: [authGuard],
    loadComponent: () => import('./components/publicar/publicar.component').then(m => m.PublicarComponent)
  },
  {
    path: 'matches',
    canActivate: [authGuard],
    loadComponent: () => import('./components/matches/matches.component').then(m => m.MatchesComponent)
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./components/perfil/perfil.component').then(m => m.PerfilComponent)
  },
  { path: '**', redirectTo: '' }
];
