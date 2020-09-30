import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[];
  recipeSubscription:Subscription;
  constructor(private recipeService:RecipeService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{this.recipes=recipes});
  }
  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }
  addNewRecipe(){
    this.router.navigate(['add-recipe'],{relativeTo: this.route});
  }
}
