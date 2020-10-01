import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  error = null;
  private errorSub: Subscription;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.errorSub = this.recipeService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}
