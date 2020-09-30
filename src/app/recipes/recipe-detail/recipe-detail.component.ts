import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedId=0;
  recipeDetail: Recipe;
  recipeSubscription: Subscription;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipeDetail = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
      description: this.recipeService.getRecipeContent(+this.route.snapshot.params['id']).description,
      imagePath: this.recipeService.getRecipeContent(+this.route.snapshot.params['id']).imagePath,
      ingredients: this.recipeService.getRecipeContent(+this.route.snapshot.params['id']).ingredients,
      errorImage: "https://pixelz.cc/wp-content/uploads/2018/07/404-not-found-graffiti-uhd-4k-wallpaper.jpg"
    };
    this.recipeSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.recipeDetail.id = params['id'];
          this.recipeDetail.name = params['name'];
          this.recipeDetail.description = this.recipeService.getRecipeContent(+params['id']).description;
          this.recipeDetail.imagePath = this.recipeService.getRecipeContent(+params['id']).imagePath;
          this.recipeDetail.ingredients = this.recipeService.getRecipeContent(+params['id']).ingredients;
        }
      );
    this.route.params.subscribe((params: Params) => {
      this.selectedId=+params['id'];
    });
  }

  ngOnDestroy() {
    //this.recipeSubscription.unsubscribe(); Sildik Çünkü bu observable angular tarafından sağlanıyor
    //Kendi observable larımızda bu şekilde unsubscribe yapmamız gerek(Angular kendi modüllerinde otomatik yapıyo)
  }

  addIngredientsToShoppingList() {
    this.recipeService.addMultipleIngredient(this.recipeDetail.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    
  }
  removeRecipe() {
    this.recipeService.removeRecipe(this.selectedId);
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }
}
