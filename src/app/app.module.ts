import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { QuillModule } from 'ngx-quill'
import { ChildModule } from './child-module/child-module'
import { AppComponent } from './app.component'
import Counter from './counter'
import { MatFormFieldModule } from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatQuillModule } from './mat-quill/mat-quill-module'
import { FormatJsonComponent } from './components/format-json/format-json.component'
import { HttpClientModule } from '@angular/common/http';
import {ClientesComponent} from './components/clientes/clientes.component'
import {TestimoniosComponent} from './components/testimonios/testimonios.component'
import {SolucionesComponent} from './components/soluciones/soluciones.component'
import {RubrosComponent} from './components/rubros/rubros.component'
import { FilePickerModule } from  'ngx-awesome-uploader';
import { BlogComponent } from './components/blog/blog.component';
import { ModulosComponent } from './components/modulos/modulos.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { IntegracionesComponent } from './components/integraciones/integraciones.component';
import { HomeComponent } from './components/home/home.component';
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    FormatJsonComponent,
    ClientesComponent,
    TestimoniosComponent,
    RubrosComponent,
    SolucionesComponent,
    BlogComponent,
    ModulosComponent,
    IntegracionesComponent,
    FaqsComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FilePickerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    QuillModule.forRoot({
      customModules: [{
        implementation: Counter,
        path: 'modules/counter'
      }],
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
    MatQuillModule,
    ChildModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
