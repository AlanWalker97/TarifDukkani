import { trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  isAuthenticated=false;
  private userSubs :Subscription;
  collapsed=true;
  constructor(private recipeService:RecipeService,private authService:AuthService) { }

  ngOnInit(): void {
    this.userSubs=this.authService.user.subscribe(user =>{
      this.isAuthenticated= !user ? false:true;
    });
  }

  postData(){
    this.recipeService.postRecipes();
  }
  fetchData(){
    this.recipeService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }
}
