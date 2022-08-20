import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor(
    private http: HttpClient,
  ) { 
    this.cargarProductos();
  }

  apiFirebase: string = 'https://angular-html-50b25-default-rtdb.firebaseio.com/';


  private cargarProductos(){//promesas recibe un callback
    return new Promise<void>( (resolve, reject) => {
      this.http.get<Producto[]>(`${this.apiFirebase}productos_idx.json`).subscribe( (resp: Producto[]) => {
        //console.log(resp);
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });

  }

  getProducto( id: string){
    return this.http.get(`${this.apiFirebase}productos/${id}.json`);
  }

  buscarProducto(termino:string){
    if(this.productos.length === 0){ //cargar productos en vacio
      this.cargarProductos().then( () => {//se ejecuta despues de tener los productos y aplicar el filtro
        this.filtrarProducto(termino);
      });
    }else{//aplicar el filtro
      this.filtrarProducto(termino);
    } 
  }
  
  private filtrarProducto(termino:string){
    //console.log(this.productos);
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();//pasar a minuscula

    this.productos.forEach((prod: Producto) =>{
      const tituloLower = prod.titulo!.toLocaleLowerCase();//pasar a minuscula

      if(prod.categoria!.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){ //validar si contiene algo
        this.productosFiltrado.push(prod);
      }
    });
  }

}
