import { Component ,ViewChild,CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { ElementRef } from '@angular/core';
import { virtualRouter } from '../../services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from '../../services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from '../../services/script.service';
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-add-post',
  standalone: true,
  imports: [QuillModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit{ 
   @ViewChild('editor') editor!: ElementRef; // Add the definite assignment assertion modifier



  modules = {
    formula: true,
    toolbar: [      
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['formula'], 
      ['image', 'code-block']
      ['title']
    ]
  };

  objectFormat = [
    { insert: 'Hello ' },
    { insert: 'World!', attributes: { bold: true } },
    { insert: '\n' }
  ]

  data = {
    title: '',
    autor: '',
    body: '',
  };

  constructor(
    // private deviceService: DeviceDetectorService,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService
    ) {
// this.global.loadRubros();
    }
  logChange($event: any) {
    console.log(this.editor);
    console.log($event);
  }
  ngOnInit(): void {
    
  }
}