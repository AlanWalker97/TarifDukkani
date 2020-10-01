import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { ChooseRecipeComponent } from './recipes/choose-recipe/choose-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListSelectedItemComponent } from './shopping-list/shopping-edit/shopping-list-selected-item/shopping-list-selected-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const appRoutes: Routes=[
    { path: '', redirectTo:'/recipes', pathMatch:'full' },
    { path: 'recipes', component: RecipesComponent, children:[
        { path: '', component:ChooseRecipeComponent},
        { path: ':id/:name', component:RecipeDetailComponent, resolve:[RecipesResolverService]},
        { path: ':id/:name/edit', component:RecipeEditComponent ,resolve:[RecipesResolverService]},
        { path: 'add-recipe', component:RecipeEditComponent},
    ] },
    { path: 'shopping-list', component: ShoppingListComponent, children:[
        {path: 'item/:id/:name', component:ShoppingListSelectedItemComponent}
    ] }
];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}