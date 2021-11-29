import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { IProducto } from '../producto-inteface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //colección de productos
  public productos: IProducto[] = [];
  public editar: boolean = false;
  public productoSeleccionado?: IProducto;
  public urlImagen:String = '';

  //imagen
  private file?: File;

  public formularioProducto: FormGroup
  public logueado: boolean = false;
  constructor(private fb: FormBuilder, private productoService: ProductoService, private auth: AuthService) {


    //iniciamos el formulario
    this.formularioProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      url: ['', Validators.required]
    })

  }

  ngOnInit(): void {

    // traigo los productos de la base
    this.productoService.obtenerProductos().subscribe((productos) => {
      console.log(productos)
      this.productos = productos;
    })

    // Verifico el estado del usuario.

    this.auth.user.subscribe((user)=>{
      if(user){
        this.logueado = true;
      }else{
        this.logueado = false;
      }
    })


  }

  async guardarProducto() {


    //vamos a subir la imagen

    //Pregunto si es un formulario valido
    if (!this.formularioProducto.invalid) {
      //Pregunto si quiero editar
      if (this.editar) {
        //pregunto si cargue algo en el file
        //en caso que no se cargue nada edito el producto sin subir la imagen
        if(this.file==undefined){
          this.productoService.editarProducto(this.productoSeleccionado!.id, this.formularioProducto.value).then(resp=>{
            this.editar = false;
            alert('Producto editado con exito');
            this.formularioProducto.reset();
          })
        }
        // si el file contiene algo entonces lo subo a storage!
        else{
          this.productoService.subirImagen(this.file!, this.formularioProducto.value, this.productoSeleccionado!.id)
          this.productoSeleccionado = undefined;
          this.file = undefined;
          this.formularioProducto.reset();
        }
        
      }
      else {
        //Agregar producto
        //llevar los datos a la base de datos! osea a firestore
        this.productoService.subirImagen(this.file!, this.formularioProducto.value);
        alert("Producto agregado con exito");
        this.formularioProducto.reset();
        this.file = undefined;

      }

    }
    else {
      alert('El formulario es invalido!!')
    }
  }

  //Metodo que se comunica con el servicio para eliminar un producto por el id

  eliminarProducto(id: string) {
    let c = confirm('Estas seguro de eliminar el producto??');
    if (c) {
      this.productoService.eliminarProducto(id).then(resul => alert('Producto eliminado con exito!'))
    }
  }

  seleccionarProducto(producto: IProducto) {
    this.editar = true;
    this.productoSeleccionado = producto;
    const { nombre, precio, descripcion, url } = producto;

    this.formularioProducto.setValue({
      nombre,
      precio,
      descripcion,
      url
    })

  }

  //resetea los valores del formulario
  resetFormulario(){
    this.formularioProducto.reset();
    this.editar = false;
  }

  obtenerFile(event:any){
    this.file = event.target.files[0];
  }

}
