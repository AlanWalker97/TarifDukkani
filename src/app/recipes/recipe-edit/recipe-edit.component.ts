import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  isIngredientExists = false;
  recipeIngredients: Ingredient[] = [];
  recipeEditForm: FormGroup;
  textAreaValue: string="";
  buttonText:string="";
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
    })
    this.recipeEditForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'description': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'imagePath': new FormControl(null, [Validators.required,
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      'ingredientName': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'ingredientAmount': new FormControl(null, [Validators.required, Validators.min(1)])
    });
    if(this.editMode){
      this.buttonText="Tarifi Düzenle";
      var myRecipe=this.recipeService.getRecipeContent(+this.id);
      this.recipeEditForm.patchValue({name:myRecipe.name,description:myRecipe.description,
                                    imagePath:myRecipe.imagePath});
      this.recipeIngredients=myRecipe.ingredients;
      for (let ingredient of myRecipe.ingredients) {
        this.textAreaValue += ingredient.name + "->" + ingredient.amount + " Adet\n";
      }
    }
    else{
      this.buttonText="Tarif Ekle";
    }
  }
  checkFormIntegrity() {
    if (this.recipeEditForm.get('name').valid && this.recipeEditForm.get('description').valid &&
      this.recipeEditForm.get('imagePath').valid && this.textAreaValue !== undefined) {
      return false;
    }
    return true;
  }
  onSubmit() {
    if(!this.editMode){
      this.recipeService.addRecipe(undefined, this.recipeEditForm.get('name').value,
      this.recipeEditForm.get('description').value,
      this.recipeEditForm.get('imagePath').value,
      this.recipeIngredients);
      this.router.navigate(['/recipes'], { relativeTo: this.route });
    }
    else{
      this.recipeService.updateRecipe(+this.id,this.recipeEditForm.get('name').value,
      this.recipeEditForm.get('description').value,
      this.recipeEditForm.get('imagePath').value,
      this.recipeIngredients);
      this.router.navigate(['/recipes'], { relativeTo: this.route });
    }
  }

  addIngredientToRecipe() {
    var ingredient = new Ingredient(this.recipeEditForm.get('ingredientName').value,
      this.recipeEditForm.get('ingredientAmount').value);
    this.isIngredientExists = false;
    this.recipeIngredients.forEach((value) => {
      if (value.name.toLocaleLowerCase() == ingredient.name.toLocaleLowerCase()) {
        value.amount += ingredient.amount;
        this.isIngredientExists = true;
        return;
      }
    });
    if (!this.isIngredientExists) {
      this.recipeIngredients.push(ingredient);
    }
    this.textAreaValue = this.getIngredientList();
    this.recipeEditForm.get('ingredientName').reset();
    this.recipeEditForm.get('ingredientAmount').reset();
  }
  removeIngredientFromRecipe() {
    var ingredient = new Ingredient(
      this.recipeEditForm.get('ingredientName').value, this.recipeEditForm.get('ingredientAmount').value);
    this.isIngredientExists = false;
    this.recipeIngredients.forEach((value) => {
      if (value.name.toLocaleLowerCase() == ingredient.name.toLocaleLowerCase()) {
        if (value.amount >= 1) {
          value.amount -= ingredient.amount;
          if (value.amount <= 0) {
            this.removeIngredient(this.recipeIngredients.indexOf(value));
          }
        }
        this.isIngredientExists = true;
        return;
      }
    });
    if (!this.isIngredientExists) {
      alert("Malzeme listesinde böyle bir malzeme bulunmuyor!");
    }
    this.textAreaValue = this.getIngredientList();
    this.recipeEditForm.get('ingredientName').reset();
    this.recipeEditForm.get('ingredientAmount').reset();
  }
  removeIngredient(index: number) {
    if (index > -1) {
      this.recipeIngredients.splice(index, 1);
    }
  }
  getIngredientList() {
    var textAreaValue = "";
    for (let ingredient of this.recipeIngredients) {
      textAreaValue += ingredient.name + "->" + ingredient.amount + " Adet\n";
    }
    return textAreaValue;
  }


}
