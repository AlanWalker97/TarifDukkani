import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
    providers:[
        ShoppingListService,
        RecipeService,
        RecipesResolverService,
        AuthGuard,
        AuthService,
        {
            provide: 
            HTTP_INTERCEPTORS, 
            useClass:AuthInterceptorService,
            multi:true}
        ]
})
export class CoreModule{}