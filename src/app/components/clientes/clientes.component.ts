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
import { AddbrandComponent } from '../addbrand/addbrand.component';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { ModalComponent } from '@app/components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrl: "./clientes.component.css",
  // providers: [NgbActiveModal]
})
export class ClientesComponent {
  dropdownList = [];
  selectedItems = [];
  showColors: boolean = true; // Agrega la propiedad 'showColors' al componente y dale un valor inicial de false

  // dropdownSettings = {};
  dropdownSettings: IDropdownSettings = {};
  editing = false;
  adding = false;
  category = "Seleccione una";
  categorySeted: boolean = false;
  isEditing = false;
  clients$: any = {};
  public captions: UploaderCaptions = {
    dropzone: {
      title: "Imágenes del producto",
      or: ".",
      browse: "Cargar",
    },
    cropper: {
      crop: "Cortar",
      cancel: "Cancelar",
    },
    previewCard: {
      remove: "Borrar",
      uploadError: "error",
    },
  };
  data = {
    images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
    name: "",
    price: 0,
    category: "",
    categories: [] as any[],
    brand: [] as any[],
    colors: [] as any[],
    model: "",
    description: "",
    year: 0,
  };

  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  constructor(
    private modalService: NgbModal,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public http: HttpClient,
    public _butler: Butler,
    public yeoman: Yeoman,
    public dataApiService: DataApiService
  ) {
    this.getAllCategories();
    this.getAllBrands();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "Seleccionar todo",
      unSelectAllText: "Deseleccionar todo",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  toggleColor(color: any) {
    const index = this.data.colors.findIndex((c) => c.hex === color.hex);
    if (index === -1) {
      // Si el color no está en la lista, lo agregamos
      this.data.colors.push(color);
    } else {
      // Si el color está en la lista, lo eliminamos
      this.data.colors.splice(index, 1);
    }
  }
  isChecked(): boolean {
    if (this.data.colors.length > 0 && this.editing) {
      this.showColors = !this.showColors;
      return this.data.colors.length > 0;
    } else {
      // this.showColors = false;
      return false;
    }
  }

  isColorSelected(color: any): boolean {
    return this.data.colors.some((c) => c.hex === color.hex);
  }

  add() {
    this.global.clientSelected = {
      name: "Seleccione una autoparte",
      images: [],
      category: null,
      id: "",
      price: 0,
      categories: [],
      brand: [],
      colors: [],
      model: "",
      description: "",

      year: 0,
    };
    this.data = {
      images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
      name: "",
      price: 0,
      categories: [] as any[],

      category: "",
      description: "",
      brand: [] as any[],
      colors: [] as any[],
      model: "",
      year: 0,
    };

    this.editing = false;
    this.adding = true;
  }
  edit(client: any) {
    this.data = this.global.clientSelected;
    this.editing = true;
    this.adding = false;
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    // Puedes pasar datos al modal utilizando el método 'componentInstance' del modalRef.
    // modalRef.componentInstance.data = myData;
  }
  openAddbrand() {
    const modalRef = this.modalService.open(AddbrandComponent);
    
    // Puedes pasar datos al modal utilizando el método 'componentInstance' del modalRef.
    // modalRef.componentInstance.data = myData;
  }
  openAddcategory() {
    const modalRef = this.modalService.open(AddcategoryComponent);
    
    // Puedes pasar datos al modal utilizando el método 'componentInstance' del modalRef.
    // modalRef.componentInstance.data = myData;
  }

  cancelarUpdate() {
    this.editing = false;
    this.adding = false;
    this.data = {
      images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
      name: "",
      price: 0,
      categories: [] as any[],

      category: "",
      brand: [] as any[],
      colors: [] as any[],
      description: "",
      model: "",
      year: 0,
    };

    this.global.clientSelected = {
      name: "Seleccione una autoparte",
      images: [],
      category: null,
      id: "",
      categories: [],
      colors: [],
      price: 0,
      brand: [],
      description: "",

      model: "",
      year: 0,
    };
  }
  preview(client: any) {
    this.global.clientSelected = client;
    this.global.clientPreview = true;
  }
  beforeDelete() {
    Swal.fire({
      title: "Seguro deseas borrar esta autoparte?",

      text: "esta acción de se podrá revertir!",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Sí, bórralo!",

      cancelButtonText: "No, mejor no",
    }).then((result) => {
      if (result.value) {
        this.deleteCliente();
        Swal.fire(
          "Borrada!",

          "La autoparte ha sido borrada.",

          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelado",

          "",

          "error"
        );
      }
    });
  }

  updateClient() {
    this.data.images =
      this._butler.uploaderImages.length > 0
        ? this._butler.uploaderImages
        : this.global.clientSelected.images;

    this.dataApiService
      .clientUpdate(this.data, this.global.clientSelected.id)
      .subscribe((response) => {
        console.log(response);
        this.global.loadClientes();
        this.editing = false;
        this.virtualRouter.routerActive = "clientes";
        this.data = {
          images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
          name: "",
          price: 0,
          categories: [] as any[],

          category: "",
          brand: [] as any[],
          colors: [] as any[],
          description: "",
          model: "",
          year: 0,
        };

        this._butler.uploaderImages = [];
        (this.adding = false),
          (this.editing = false),
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Autoparte Actualizada",
            showConfirmButton: false,
            timer: 1500,
          });
      });
  }
  deleteCliente() {
    this.global
      .deleteClient(this.global.clientSelected.id)
      .subscribe((response) => {
        this.global.rubroSelected = {
          name: "Seleccionar",
          images: [],
          id: "",
          ref: "",
        };
        this.global.loadClientes();

        this.global.clientSelected = {
          name: "Seleccione una autoparte",
          images: [],
          category: null,
          id: "",
          categories: [],
          colors: [],
          price: 0,
          brand: [],
          description: "",
          model: "",
          year: 0,
        };
      });
  }
  onSubmit() {
    // this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    this.data.images = this._butler.uploaderImages;
    this.dataApiService.saveClient(this.data).subscribe((response) => {
      console.log(response);
      this.global.loadClientes();
      this._butler.uploaderImages = [];
      this.data = {
        images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
        name: "",
        price: 0,
        categories: [] as any[],

        category: "",
        brand: [] as any[],
        colors: [] as any[],
        model: "",
        description: "",
        year: 0,
      };

      this.editing = false;
      Swal.fire("Bien...", "Autoparte agregada satisfactoriamente!", "success");
      this.editing = false;
      this.adding = false;
      this.global.loadClientes();
      this.virtualRouter.routerActive = "clientes";
    });
    console.log(this.data);
  }
  getAllCategories() {
    this.dataApiService.getAllCategory().subscribe((response) => {
      this.yeoman.categories = response;
      this.yeoman.allcategory = response;
      this.yeoman.categories = this.yeoman.categories.items;
      this.yeoman.allcategory = this.yeoman.allcategory.items;
      this.yeoman.allCategoriesSize = this.yeoman.categories.length;
    });
  }
  getAllBrands() {
    this.dataApiService.getAllBrand().subscribe((response) => {
      this.yeoman.brands = response;
      // this.yeoman.allcategory = response;
      this.yeoman.brands = this.yeoman.brands.items;
    });
  }

  onCategorySelect(category: any) {
    // this.data.category = "c" + category.id;
    console.log(category.id);
  }

  // setCategory(category: any) {
  //   let index = category;
  //   console.log("seleccionada: " + this.yeoman.allcategory[index].name);
  //   this.categorySeted = true;
  //   if (this.yeoman.categories !== undefined) {
  //     this.data.category = this.yeoman.allcategory[index].id;
  //     console.log("id: " + JSON.stringify(this.data.category));
  //   }
  // }
}
