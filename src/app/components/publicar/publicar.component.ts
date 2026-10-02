import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjetoService } from '../../services/objeto.service';
import { ItemRequest } from '../../models/item-request.model';
import { ItemType } from '../../models/item-type.enum';
import { ItemCategory } from '../../models/item-category.enum';

@Component({ selector: 'app-publicar', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './publicar.component.html', styleUrls: ['./publicar.component.css'] })
export class PublicarComponent {
  enviado = false; imagemNome = ''; imagemSelecionada?: File; erro = ''; carregando = false;
  readonly tipos = Object.values(ItemType); readonly categorias = Object.values(ItemCategory);
  readonly form = this.fb.nonNullable.group({
    type: [ItemType.PERDIDO, Validators.required], title: ['', [Validators.required, Validators.maxLength(150)]],
    category: [ItemCategory.OUTRO, Validators.required], color: [''], occurredAt: ['', Validators.required],
    locationDescription: [''], locationAddress: [''], description: ['', Validators.maxLength(2000)],
    latitude: [null as number | null], longitude: [null as number | null]
  });
  constructor(private readonly fb: FormBuilder, private readonly service: ObjetoService, private readonly router: Router) {}
  readonly tiposImagemPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
  selecionarImagem(event: Event): void {
    const input = event.target as HTMLInputElement; const file = input.files?.[0];
    this.erro = '';
    if (file && !this.tiposImagemPermitidos.includes(file.type)) {
      this.erro = 'Formato de imagem não suportado. Use JPEG, PNG ou WEBP.';
      input.value = ''; this.imagemSelecionada = undefined; this.imagemNome = ''; return;
    }
    this.imagemSelecionada = file; this.imagemNome = file?.name ?? '';
  }
  private mensagemErro(error: any, padrao: string): string {
    if (error?.status === 0) return 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
    if (error?.status === 401) return 'Sua sessão expirou. Faça login novamente.';
    const detalhes: string[] | undefined = error?.error?.details;
    if (detalhes?.length) return detalhes.join(' | ');
    return error?.error?.message || padrao;
  }
  publicar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.erro = ''; this.carregando = true; const value = this.form.getRawValue();
    const request: ItemRequest = {
      title: value.title, description: value.description || undefined, type: value.type, category: value.category,
      color: value.color || undefined, occurredAt: value.occurredAt, latitude: value.latitude ?? undefined,
      longitude: value.longitude ?? undefined, locationAddress: value.locationAddress || undefined,
      locationDescription: value.locationDescription || undefined
    };
    this.service.criar(request).subscribe({
      next: item => {
        const finalizar = (delay = 700) => { this.enviado = true; this.carregando = false; setTimeout(() => this.router.navigate(['/objetos']), delay); };
        if (!this.imagemSelecionada) { finalizar(); return; }
        this.service.adicionarImagem(item.id, this.imagemSelecionada).subscribe({ next: () => finalizar(), error: err => { this.erro = 'Objeto criado, mas a imagem não foi enviada: ' + this.mensagemErro(err, 'erro desconhecido.'); finalizar(4000); } });
      },
      error: error => { this.erro = this.mensagemErro(error, 'Não foi possível publicar o objeto.'); this.carregando = false; }
    });
  }
}
