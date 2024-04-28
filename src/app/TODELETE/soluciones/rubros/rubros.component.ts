import { Component } from '@angular/core';
import { virtualRouter } from '../../../services/virtualRouter.service'; 
import { GlobalService } from '../../../services/global.service'; 
import { ScriptService } from '../../../services/script.service';
import { ScriptStore } from '../../../services/script.store';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from '../../../components/file-picker.adapter';
import { Butler } from '../../../services/butler.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from '../../../services/data-api-service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Yeoman } from '@app/services/yeoman.service';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrl: './rubros.component.css'
})
export class RubrosComponent {
  editing = false;
  adding = false;
  isEditing = false;
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes de rubros',
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
    images: [] as string[], 
    name: '',
    ref: ''
  };

  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  
  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public _butler: Butler,
    public dataApiService: DataApiService,
    public http: HttpClient,
    public yeoman: Yeoman
    ) {
    }
    preview(rubro:any){
      this.global.rubroSelected=rubro;
      this.global.rubroPreview=true;
    }
    edit() {
      this.editing = true;
      this.data=this.global.rubroSelected;
    }
    cancelarUpdate() {
      this.editing = false;
    }
   
    simpleAlert(){

      Swal.fire('Hello world!');
  
    }
    add(){
      this.adding=true;
    }
    beforeDelete(){
      Swal.fire({
  
        title: 'Seguro deseas borrar este rubro?',
  
        text: 'esta acción de se podrá revertir!',
  
        icon: 'warning',
  
        showCancelButton: true,
  
        confirmButtonText: 'Sí, bórralo!',
  
        cancelButtonText: 'No, mejor no'
  
      }).then((result) => {
  
        if (result.value) {
           this.deleteRubro()
          Swal.fire(
  
            'Borrado!',
  
            'el rubro ha sido borrado.',
  
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
    onSubmit() {
      this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
      this.data.images = this._butler.uploaderImages;
      this.dataApiService.saveCategory(this.data).subscribe(response => {
        console.log(response);
        this._butler.uploaderImages = [];
        this.data.images = [];
       /*  this.global.loadRubros(); */
        this.editing = false;
        this.data= {
          images: [] as string[], 
          name: '',
          ref: ''
        };
        Swal.fire('Bien...', 'Rubro agregado satisfactoriamente!', 'success');
        this.editing=false;
        this.adding=false;
        this.global.loadRubros();
        this.virtualRouter.routerActive="rubros";
  
         });
         
      console.log(this.data);
    }

    updateRubro() {
      this.data.images = this._butler.uploaderImages;
      this.dataApiService.categoryUpdate(this.data, this.global.rubroSelected.id).subscribe(response => {
        
        console.log(response);
        this.global.loadRubros();
        this.editing = false;
        this.virtualRouter.routerActive = "rubros";
        this.data= {
          images: [] as string[], 
          name: '',
          ref: ''
        };
        this._butler.uploaderImages = [];
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Rubro Actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
    
    
    
    

    deleteRubro(){
      this.global.deleteRubro(this.global.rubroSelected.id).subscribe(response =>{
        this.global.rubroSelected={ name: "Seleccionar",  images: [] , id:"",ref:""};
        this.global.loadRubros();
      });
    }
    ngAfterViewInit(): void {
  
    }
}
