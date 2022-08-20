import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-paginas.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean = false;

  constructor(
    private http: HttpClient
  ) { 
    //leer el archivo json
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
       
    });
    
  }
}
