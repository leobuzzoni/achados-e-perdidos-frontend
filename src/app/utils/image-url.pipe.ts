import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converte a URL de imagem retornada pelo backend (ex.: "/uploads/abc.jpg")
 * para o endpoint correto da API: "/api/v1/images/abc.jpg".
 * Se não houver imagem, devolve o placeholder local.
 */
@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  private static readonly API_IMAGES = '/api/v1/images';
  private static readonly PLACEHOLDER = 'assets/placeholder.svg';

  transform(value: string | null | undefined): string {
    if (!value) return ImageUrlPipe.PLACEHOLDER;
    if (value.startsWith('data:') || value.startsWith('blob:')) return value;

    // Remove query string/fragment e pega apenas o nome do arquivo
    const clean = value.split(/[?#]/)[0];
    const filename = clean.substring(clean.lastIndexOf('/') + 1);
    if (!filename) return ImageUrlPipe.PLACEHOLDER;

    return `${ImageUrlPipe.API_IMAGES}/${encodeURIComponent(decodeURIComponent(filename))}`;
  }
}
