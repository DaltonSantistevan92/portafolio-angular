import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.innterface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  productoDesc!: ProductoDescripcion;
  producto_id: string | undefined;

  fechaActual: string | undefined;

  constructor(
    private route:ActivatedRoute,
    private productoService: ProductosService
  ) { }

  ngOnInit(): void {
    this.getProductoId();
    this.mostrarFecha();  
  }
  
  mostrarFecha(){
    const MESES = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let fecha = new Date();
    let dia = fecha.getDate(); let mes = MESES[fecha.getMonth()]; let anio =  fecha.getFullYear(); 
    let f = `${dia} ${mes}, ${anio}`;
    this.fechaActual = f;    
  }

  getProductoId(){
    this.route.params.subscribe(parametros => {
      //console.log(parametros['id']);
      this.productoService.getProducto(parametros['id']).subscribe( (resp: ProductoDescripcion) => {
        //console.log(resp);
        this.producto_id = parametros['id'];
        this.productoDesc = resp;
      });
    })
  }

}
