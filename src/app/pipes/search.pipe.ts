import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(lista: any[], texto: string): any {
    if(!texto) return lista;
    if(texto.includes('-'))     return lista.filter(item =>  item.fecha.includes(texto));
    return lista.filter(item =>  item.correoPrincipal.includes(texto))
  }

}
