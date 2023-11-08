import { Pipe, PipeTransform } from '@angular/core';
import { isTemplateExpression } from 'typescript';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(lista: any[], texto: string): any {
    if(!texto) return lista;
    if(texto.includes('-'))    { return lista.filter(item =>  item.fecha.includes(texto));}

      try {
        return lista.filter(item =>  item.paciente.includes(texto));
      } catch (error) {
        try {
          return lista.filter(item =>  item.correoPrincipal.includes(texto));
        } catch (error) {
          return lista.filter(item =>  item.correo.includes(texto));
        }

      }

  }

}
