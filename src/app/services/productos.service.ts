import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(
    private http: HttpClient,
  ) { 
    this.cargarProductos();
  }

  apiFirebase: string = 'https://angular-html-50b25-default-rtdb.firebaseio.com/';


  private cargarProductos(){
    this.http.get<Producto[]>(`${this.apiFirebase}productos_idx.json`)
    .subscribe( (resp: Producto[]) => {
      //console.log(resp);
      this.productos = resp;
      this.cargando = false;
    });
  }

}
