import { AfterViewInit, Component } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; 
import { GlobalService } from './../../services/global.service'; 
import { ScriptService } from './../../services/script.service';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from './../file-picker.adapter';
import { Butler } from './../../services/butler.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from './../../services/data-api-service';
import { Yeoman } from '@app/services/yeoman.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-soluciones',
  templateUrl: './soluciones.component.html',
  styleUrl: './soluciones.component.css'
})

export class SolucionesComponent implements AfterViewInit {
  editing = false;
  isEditing = false;
  mouseOverIndex: number = -1;
  
  
  soluciones: any;
  // En tu componente TypeScript
isMouseOverCard: boolean = false;

// Funciones para manejar eventos del mouse

  category = 'Seleccione una';
  categorySeted: boolean = false;
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes de la solucion',
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
    description: '',
    ref: '',
    idCategory: ''
  };

  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  constructor(
    public http: HttpClient,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public _butler: Butler,
    public dataApiService: DataApiService,
    public yeoman: Yeoman
  ) {
  }
  cancelarUpdate() {
    this.editing = false;
  }
  edit(solucion:any) {
    this.editing = true;
    this.global.solucionSelected=solucion;
    this.data=solucion;
  }
  new() {
    this.editing = true;
    this.data=   {
      images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
      name: '',
      description: '',
      ref: '',
      idCategory: ''
    };
  
  }
  onMouseEnterCard(index: number) {
    this.isMouseOverCard = true;
    this.mouseOverIndex = index;
  }
  
  onMouseLeaveCard() {
    this.isMouseOverCard = false;
    this.mouseOverIndex = -1; // Reiniciar el índice cuando se sale del elemento
  }
  preview(client: any) {
    this.global.clientSelected = client;
    this.global.clientPreview = true;
  }
  onSubmit() {
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    this.data.images = this._butler.uploaderImages;
    this.dataApiService.saveProduct(this.data).subscribe(response => {
      console.log(response);
      this._butler.uploaderImages = [];
      this.global.loadSoluciones();
      this.editing=false;
      this.data=  {
        images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
        name: '',
        description: '',
        ref: '',
        idCategory: ''
      };
      Swal.fire('Bien...', 'Solución agregada satisfactoriamente!', 'success');
        this.editing=false;
        this.global.loadSoluciones();
        this.virtualRouter.routerActive="soluciones";
    });
    
    console.log(this.data);
  }
  updateSolution() {
    this.dataApiService.productsUpdate(this.data, this.global.solucionSelected.id).subscribe(response => {
      console.log(response);
      this._butler.uploaderImages=[];
      this.global.loadSoluciones();
      this.virtualRouter.routerActive="soluciones";
      this.editing = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Información guardada',
        showConfirmButton: false,
        timer: 1500
      })         
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
  deleteSolucion(i:any){
    this.global.deleteSolucion(i).subscribe(response =>{
      this.global.loadSoluciones();
      Swal.fire('Solución borrada');
    });
  }
  ngAfterViewInit(): void {
    this.global.showDescriptionArray = new Array(this.global.soluciones.length).fill(false);
  }
  beforeDelete(i:any){
    Swal.fire({

      title: 'Seguro deseas borrar esta solución?',

      text: 'esta acción de se podrá revertir!',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sí, bórralo!',

      cancelButtonText: 'No, mejor no'

    }).then((result) => {

      if (result.value) {
         this.deleteSolucion(i)
        Swal.fire(

          'Borrado!',

          'La solución ha sido borrada.',

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
}
