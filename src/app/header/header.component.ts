import { trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed=true;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }

  postData(){
    this.recipeService.postRecipes();
  }
  fetchData(){
    this.recipeService.fetchRecipes().subscribe();
    /*for(var recipe of this.newRecipes){
      this.recipeService.addRecipe(recipe);
    }*/
    
  }
}
