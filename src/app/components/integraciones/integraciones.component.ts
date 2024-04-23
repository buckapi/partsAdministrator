import { Component } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; 
import { GlobalService } from './../../services/global.service'; 
import { ScriptService } from './../../services/script.service';
import { Butler } from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api-service';
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from './../file-picker.adapter';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-integraciones',
  templateUrl: './integraciones.component.html',
  styleUrl: './integraciones.component.css'
})
export class IntegracionesComponent {
  editing=false;
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes de la integración',
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
  };
  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public _butler: Butler,
    public dataApiService: DataApiService,
    public http: HttpClient
   
    ) {
    }
    preview(integration:any){
      this.global.integrationSelected=integration;
      this.global.integrationPreview=true;
    }
    edit() {
      this.editing = true;
    }
    cancelarUpdate() {
      this.editing = false;
      this._butler.uploaderImages = [];
    }
    simpleAlert(){

      Swal.fire('Hello world!');
  
    }
    deleteIntegration(i:any){
      this.global.deleteIntegration(i).subscribe(response =>{
        this.global.loadIntegrations();
        Swal.fire('Integración borrada');
      });
    }
    onSubmit() {
      this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
      this.data.images = this._butler.uploaderImages;
      this.dataApiService.saveIntegrations(this.data).subscribe(response => {
        console.log(response);
        this._butler.uploaderImages = [];
        this.data.images = [];
       /*  Swal.fire('Bien...', 'Integración agregada satisfactoriamente!', 'success'); */
        this.data=  {
          images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
          name: '',
          ref: '',
          
        };
        this.global.loadIntegrations();
        this.editing=false;
        Swal.fire('Bien...', 'Integración agregada satisfactoriamente!', 'success');
        this.editing=false;
        this.global.loadIntegrations();
        this.virtualRouter.routerActive="integraciones";
      });
      console.log(this.data);
    }
    beforeDelete(i:any){
      Swal.fire({
    
        title: 'Seguro deseas borrar esta Integración?',
    
        text: 'esta acción no se podrá revertir!',
    
        icon: 'warning',
    
        showCancelButton: true,
    
        confirmButtonText: 'Sí, bórrala!',
    
        cancelButtonText: 'No, mejor no'
    
      }).then((result) => {
    
        if (result.value) {
          this.deleteIntegration(i)
          Swal.fire(
    
            'Borrado!',
    
            'La integración ha sido borrada.',
    
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
    ngAfterViewInit(): void {
    }
}