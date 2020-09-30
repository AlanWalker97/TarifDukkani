import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[]=[
    new Ingredient("Tuz", 1),
    new Ingredient("Şeker", 4)
  ];
  isIngredientExists: boolean = false;
  constructor(){}
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.isIngredientExists = false;
    this.ingredients.forEach((value) => {
      if (value.name.toLocaleLowerCase() == ingredient.name.toLocaleLowerCase()) {
        value.amount += ingredient.amount;
        this.isIngredientExists = true;
        return;
      }
    });
    if (!this.isIngredientExists) {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());//Dizi her değiştiğinde tekrar kopyasını alıyoruz.
  }
  addMultipleIngredient(ingredients: Ingredient[]) {
    ingredients.forEach((value) => {
      this.addIngredient(value);
    });
  }
  decreaseIngredientAmount(ingredient:Ingredient){
    this.isIngredientExists = false;
    this.ingredients.forEach((value) => {
      if (value.name.toLocaleLowerCase() == ingredient.name.toLocaleLowerCase()) {
        if(value.amount>=1){
          value.amount -= ingredient.amount;
          if(value.amount<=0){
            this.removeIngredient(this.ingredients.indexOf(value));
          }
        }
        this.isIngredientExists = true;
        return;
      }
    });
    if (!this.isIngredientExists) {
      alert("Alışveriş listesinde böyle bir ürün bulunmuyor!");
    }
    this.ingredientsChanged.next(this.ingredients.slice());//Dizi her değiştiğinde tekrar kopyasını alıyoruz.
  }

  removeIngredient(index:number){
    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
    this.ingredientsChanged.next(this.ingredients.slice());//Dizi her değiştiğinde tekrar kopyasını alıyoruz.
  }
}