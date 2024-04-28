import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { virtualRouter } from '../../services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from '../../services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from '../../services/script.service';
// import { DeviceDetectorService } from 'ngx-device-detector';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { ScriptStore } from '../../services/script.store';
@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  constructor(
    // private deviceService: DeviceDetectorService,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService
    ) {


    }
}
