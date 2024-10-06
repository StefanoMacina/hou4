import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { addIcons } from "ionicons";
import {
  addCircleOutline,
  addOutline,
  cameraOutline,
  chevronBackOutline,
  chevronDownCircleOutline,
  colorWandOutline,
  library,
  menuOutline,
  pencilOutline,
  playCircle,
  radio,
  search,
} from "ionicons/icons";

import { ReactiveFormsModule } from "@angular/forms";
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerOptions,
  CapacitorBarcodeScannerTypeHintALLOption,
} from "@capacitor/barcode-scanner";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonModal,
  IonNote,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
  ModalController,
  ToastController,
} from "@ionic/angular/standalone";
import { Subject, takeUntil } from "rxjs";
import { DataService } from "../services/data.service";
import { Product } from "../shared/interfaces";
import { Addproduct } from "./components/addProduct/addproduct.component";
import { ListComponent } from "./components/list/list.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { AiRecipeComponent } from "./components/ai-recipe/ai-recipe.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: true,
  imports: [
    IonRefresher,
    IonRefresherContent,
    IonItemSliding,
    IonItemOption,
    IonLabel,
    IonItemOptions,
    CommonModule,
    Addproduct,
    ReactiveFormsModule,
    IonDatetime,
    IonDatetimeButton,
    IonInput,
    IonModal,
    IonItem,
    ListComponent,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList,
    IonTabBar,
    IonTabButton,
    IonProgressBar,
    IonGrid,
    IonCol,
    IonRow,
    IonNote,
  ],
})
export class HomePage implements OnInit {
  private destroyed$ = new Subject<void>();
  checkedProducts: Product[] = [];
  name: string | undefined;
  modaltext!: string | number;
  isSelectable: boolean = false;
  isModalOpen: boolean = false;
  private readonly _data = inject(DataService);
  private modalCtrl = inject(ModalController);
  public products!: Product[];
  public barcodeResult!: string;
  private options: CapacitorBarcodeScannerOptions = {
    scanButton: true,
    hint: CapacitorBarcodeScannerTypeHintALLOption.ALL,
  };

  @ViewChild(IonModal) modal!: IonModal;
  progress: number = 0;
  showProgressBar: boolean = false;

  constructor(private _toastController: ToastController) {
    addIcons({
      library,
      playCircle,
      radio,
      search,
      addOutline,
      pencilOutline,
      cameraOutline,
      addCircleOutline,
      chevronDownCircleOutline,
      colorWandOutline,
      menuOutline,
      chevronBackOutline,
    });
  }

  public async scanBarcode(): Promise<void> {
    this.barcodeResult = (
      await CapacitorBarcodeScanner.scanBarcode(this.options)
    ).ScanResult;
    console.log("Barcode data:", this.barcodeResult);
  }

  async presentToast(position: "top" | "middle" | "bottom", message: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

  gotoRecipeGen() {
    this.isSelectable = !this.isSelectable;
    this.checkedProducts.splice(0, this.checkedProducts.length);
    // this._router.navigate(["app", "generate-recipe"]);
  }

  async openModal(
    component: string, 
    id?: number | null, 
    isSheet? : boolean, 
    breakpoints?: number[],
    initialBreakpoint? : number, 
    backdropDismiss?: boolean
  ) {
    const modal = await this.modalCtrl.create({
      component: (() => {
        switch (component) {
          case "addproduct":
            return Addproduct;
          case "productDetail":
            return ProductDetailComponent;
          case "aiRecipe":
            return AiRecipeComponent;
          default:
            return Addproduct;
        }
      })(),
      componentProps:
        component == "productDetail"
          ? {
              product: this.products.find((p) => p.id == id),
            }
          : {
              products: this.checkedProducts,
            },
            
      breakpoints: breakpoints,
      initialBreakpoint: initialBreakpoint,
      backdropDismiss: backdropDismiss,  
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
  
    if (role == "cancel") {
      this.refreshdata();
    }
  
    if (role == "confirm" && data) {
      this._data.addProduct(data).subscribe(() => {
        this.refreshdata();
      });
    }
    if (role == "update" && data) {
      this._data.updateProduct(data, data.id).subscribe(() => {
        this.refreshdata();
      });
    }
  }
  

  generateRecipe() {
    this.openModal("aiRecipe",null,true,[0, 0.25, 0.5, 0.75, 1],0.25, false);
  }

  isChecked(p: Product) {
    if (this.checkedProducts.includes(p)) {
      this.checkedProducts = this.checkedProducts.filter((v) => v != p);
    } else {
      this.checkedProducts.push(p);
    }
  }

  deleteAll() {
    this._data.delete(this.checkedProducts).subscribe(() => {
      this.checkedProducts.splice(0, this.checkedProducts.length);
      this.refreshdata();
    });
  }

  deleteProduct(product: Product) {
    this.checkedProducts.push(product);
    this._data.delete(this.checkedProducts).subscribe(() => {
      this.checkedProducts.splice(0, this.checkedProducts.length);
      this.refreshdata();
    });
  }

  refreshdata(event?: any) {
    this._data.getAllDataSubject().subscribe(() => {
      event.target.complete();
    });
  }

  ngOnInit(): void {
    this.refreshdata();
    this._data.products$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
