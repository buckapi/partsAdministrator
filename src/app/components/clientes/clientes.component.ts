import { Component } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from './../../services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from './../../services/script.service';
import { ScriptStore } from './../../services/script.store';
import { HttpClient } from '@angular/common/http';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from '../file-picker.adapter';
import { DataApiService } from './../../services/data-api-service';
import { Butler } from './../../services/butler.service';
import { Yeoman } from './../../services/yeoman.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent {
  editing = false;
  isEditing = false;
  category = 'Seleccione una';
  categorySeted: boolean = false;
  clients$: any = {};
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes del cliente',
      or: '.',
      browse: 'Cargar',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Borrar',
      uploadError: 'error',
    },
  };
  data = {
    images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
    name: '',
    ref: '',
    idCategory: '',
  };

  adapter = new DemoFilePickerAdapter(this.http, this._butler)
  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public http: HttpClient,
    public _butler: Butler,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
  ) {
    this.getAllCategories();
  }
  edit() {
    this.editing = true;
  }
  cancelarUpdate() {
    this.editing = false;
  }
  preview(client: any) {
    this.global.clientSelected = client;
    this.global.clientPreview = true;
  }
  beforeDelete(){
    Swal.fire({

      title: 'Seguro deseas borrar este cliente?',

      text: 'esta acción de se podrá revertir!',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sí, bórralo!',

      cancelButtonText: 'No, mejor no'

    }).then((result) => {

      if (result.value) {
        this.deleteCliente()
        Swal.fire(

          'Borrado!',

          'El cliente ha sido borrado.',

          'success'

        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire(

          'Cancelado',

          '',

          'error'

        )

      }

    })
  }

deleteCliente(){
  

}
  onSubmit() {
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    this.data.images = this._butler.uploaderImages;
    this.dataApiService.saveClient(this.data).subscribe(response => {
      console.log(response);
      this.global.loadClientes();
      this._butler.uploaderImages = [];
      this.data= {
        images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
        name: '',
        ref: '',
        idCategory: '',
      };
      this.editing=false;
      Swal.fire('Bien...', 'Cliente agregado satisfactoriamente!', 'success');
        this.editing=false;
        this.global.loadClientes();
        this.virtualRouter.routerActive="clientes";
    });
    console.log(this.data);
  }
  getAllCategories() {
    this.dataApiService.getAllCategory().subscribe(response => {
      this.yeoman.categories = response;
      this.yeoman.allcategory = response;
      this.yeoman.allCategoriesSize = this.yeoman.categories.length;
    });
  }

  onCategorySelect(category: any) {
    this.data.idCategory = "c" + category.id;
    console.log(category.id);
  }

  setCategory(category: any) {
    let index = category;
    console.log("seleccionada: " + this.yeoman.allcategory[index].name);
    this.categorySeted = true;
    if (this.yeoman.categories !== undefined) {
      this.data.idCategory = this.yeoman.allcategory[index].id;
      console.log("id: " + JSON.stringify(this.data.idCategory));
    }
  }

}
