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

import { HttpClientModule } from '@angular/common/http';
import {ClientesComponent} from './components/clientes/clientes.component'

import { FilePickerModule } from  'ngx-awesome-uploader';

// import { IntegracionesComponent } from './components/integraciones/integraciones.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from '@app/components/settings/settings.component'
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OrdersComponent} from '@app/components/orders/orders.component'
import { AddbrandComponent} from '@app/components/addbrand/addbrand.component'
import { AddcategoryComponent} from '@app/components/addcategory/addcategory.component'

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    // FormatJsonComponent,
    ClientesComponent,
    // TestimoniosComponent,
    // RubrosComponent,
    // SolucionesComponent,
    // BlogComponent,
    // ModulosComponent,
    // IntegracionesComponent,
    // FaqsComponent,
    HomeComponent,
    SettingsComponent,
    ModalComponent,
    OrdersComponent,
    AddbrandComponent,
    AddcategoryComponent

  ],
  imports: [
    ColorPickerModule,
    HttpClientModule,
    BrowserModule,
    FilePickerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule,
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
    ChildModule,
    NgbModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
