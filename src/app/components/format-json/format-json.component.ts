import { Component, OnInit } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from './../../services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from './../../services/script.service';
// import { ScriptStore } from './../../services/script.store';
import { HttpClient } from '@angular/common/http';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from '../file-picker.adapter';
import { DataApiService } from './../../services/data-api-service';
import { Butler } from './../../services/butler.service';
import { Yeoman } from './../../services/yeoman.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-format-json',
  templateUrl: './format-json.component.html'
})
export class FormatJsonComponent implements OnInit{
  editing = false;
  jsonFormat = '';
  // jsonFormat = '{\"ops\":[{\"insert\":\"hello\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"world\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"}]}'
  adapter = new DemoFilePickerAdapter(this.http, this._butler)
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágen de portada',
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
    img: '', 
    title: '',
    autor: '',
    body: {}  
  };
  objectFormat = [
    { insert: 'Hello ' },
    { insert: 'World!', attributes: { bold: true } },
    { insert: '\n' }
  ]



  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public http: HttpClient,
    public _butler: Butler,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
  ){}
  edit() {
    this.editing = true;
  }
  cancelarUpdate() {
    this.editing = false;
  }
  ngOnInit(): void {
    
  }
  onSubmit() {
    this.data.img = this._butler.uploaderImages[0];
    this.data.body=this.objectFormat;
    this.dataApiService.savePost(this.data).subscribe(response => {
      console.log(response);
      this._butler.uploaderImages = [];

      Swal.fire('Bien...', 'El post ha sido agregado satisfactoriamente!', 'success');
      this.editing=false;
      this.global.loadPosts();
      this.virtualRouter.routerActive="blog";

    });
    console.log(this.data);
  }
}
