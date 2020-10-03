import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { ChooseRecipeComponent } from './choose-recipe/choose-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
    { path: '', component: RecipesComponent, canActivate:[AuthGuard] ,children:[
        { path: '', component:ChooseRecipeComponent},
        { path: ':id/:name', component:RecipeDetailComponent, resolve:[RecipesResolverService]},
        { path: ':id/:name/edit', component:RecipeEditComponent ,resolve:[RecipesResolverService]},
        { path: 'add-recipe', component:RecipeEditComponent},
    ] },
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{}