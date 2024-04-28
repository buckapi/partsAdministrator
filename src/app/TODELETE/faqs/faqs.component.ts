import { Component, OnInit } from '@angular/core';
import { virtualRouter } from '../../services/virtualRouter.service'; 
import { GlobalService } from '../../services/global.service'; 
import { ScriptService } from '../../services/script.service';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from  '../../components/file-picker.adapter';
import { Butler } from '@app/services/butler.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from '@app/services/data-api-service';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  editing=false;
  public captions: UploaderCaptions = {
  dropzone: {
    title: 'Imágenes del testimonio',
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
  question:[{ ask: '', answer: '' }],
  idCategory:'',
  ref: '',
};

adapter = new  DemoFilePickerAdapter(this.http,this._butler);
  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public _butler:Butler,     
    public dataApiService:DataApiService,
    public http: HttpClient
    ) {
    }
    preview(faqs:any){
      this.global.faqsSelected=faqs;
      this.global.faqsPreview=true;
    }
    edit(){
      this.editing=true;
    }
   
    onSubmit() {
      this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
      this.data.images=this._butler.uploaderImages;
      this.dataApiService.saveFaqs(this.data).subscribe(response=>{
        console.log(response);
        this._butler.uploaderImages=[];
      });
      console.log(this.data);
      
      }

  ngOnInit(): void {
  }

}
