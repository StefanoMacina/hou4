import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonText, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { Product, ResponseRecipeGeneration } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-ai-recipe',
  templateUrl: './ai-recipe.component.html',
  styleUrls: ['./ai-recipe.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButton, IonButtons, IonContent, IonTitle, IonItemGroup, IonItem, IonItemDivider, IonLabel, IonList, IonText, CommonModule]
})
export class AiRecipeComponent implements OnInit {

  @Input() products: Product[] = [];

  recipe: ResponseRecipeGeneration = {
    title: '',
    ingredientsList: [],
    stepsList: [],
    text: ''
  };

  constructor(
    private _modalCtrl: ModalController,
    private readonly _data: DataService
  ) {}

  ngOnInit() {
    this._data.generateRecipe(this.products).subscribe((data) => {
      console.log('Recipe data received:', data); // Log the entire response
  
      this.recipe = {
        title: data.title,
        ingredientsList: data.ingredientsList,
        stepsList: data.stepsList,
        text: data.text
      };
  
      console.log('Processed recipe:', this.recipe); // Log the processed recipe
    });
  }
  

  cancel() {    
    return this._modalCtrl.dismiss(null, 'cancel');
  }
}

