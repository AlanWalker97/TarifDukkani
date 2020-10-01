import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class RecipeService {
    error = new Subject<string>();
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    private existingRecipes: Recipe[];
    constructor(private http: HttpClient, private shoppingListService: ShoppingListService, private route: ActivatedRoute) {

        //this.addRecipe(new Recipe(this.recipes.length + 1, 'Bezelye', 'Nefis Yemek', 'https://im.haberturk.com/2020/04/03/ver1585920644/2634635_810x458.jpg', [new Ingredient("Bezelye", 1), new Ingredient("Tuz", 1), new Ingredient("Domates", 1)]));
        //this.addRecipe(new Recipe(this.recipes.length + 1, 'Patates Kızartması', 'Güzel ama bol kilolu', 'https://im.haberturk.com/2019/10/11/ver1570791680/patates-kizartmasi-tarifi_2530072_810x458.jpg', [new Ingredient("Patates", 1), new Ingredient("Yağ", 1), new Ingredient("Tuz", 1)]));
        //this.addRecipe(new Recipe(this.recipes.length + 1, 'Makarna', 'Tam bi öğrenci yemeği', 'https://cdn.yemek.com/mncrop/313/280/uploads/2017/11/domatesli-demleme-makarna-tarifi.jpg', [new Ingredient("Tuz", 1), new Ingredient("Makarna", 1), new Ingredient("Yağ", 1)]));

    }
    getRecipes() {
        return this.recipes.slice();//Arrayin Kopyasını aldık
    }
    createRecipes(serverData: Recipe[]) {
        this.recipes = serverData;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipeContent(id: number) {
        for (let recipe of this.recipes) {
            if (this.recipes.indexOf(recipe) + 1 === id) {
                return recipe;
            }
        }
    }
    addRecipe(recipe?: Recipe, name?: string, description?: string, imagePath?: string, recipeIngredients?: Ingredient[]) {
        if (recipe !== undefined) {
            this.recipes.push(recipe);
        }
        else {
            this.recipes.push(new Recipe(this.recipes.length + 1, name, description, imagePath, recipeIngredients));
        }
        this.recipesChanged.next(this.recipes.slice());
    }

    removeRecipe(id: number) {
        this.recipes.splice(id - 1, 1);
        for (let recipe of this.recipes) {
            if (recipe.id > id) {
                recipe.id -= 1;
            }
        }
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(id: number, name: string, description: string, imagePath: string, recipeIngredients: Ingredient[]) {
        for (let recipe of this.recipes) {
            if (recipe.id === id) {
                recipe.name = name;
                recipe.description = description;
                recipe.imagePath = imagePath;
                recipe.ingredients = recipeIngredients;
                return;
            }
        }
    }

    addMultipleIngredient(ingredients: Ingredient[]) {
        this.shoppingListService.addMultipleIngredient(ingredients);
    }

    postRecipes() {
        /*for (var recipe of this.recipes) {
            const postData = recipe;
            this.http
                .post<any>(
                    'https://ng-tarifdukkani.firebaseio.com/posts.json',
                    postData)
                .subscribe(
                    error => {
                        this.error.next(error.message);
                    }
                );
        }*/
        const recipes = this.getRecipes();
        this.http
          .put(
            'https://ng-tarifdukkani.firebaseio.com/posts.json',
            recipes
          )
          .subscribe();

    }
    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://ng-tarifdukkani.firebaseio.com/posts.json',
            )
            .pipe(
                map(responseData => {
                    const postsArray: Recipe[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key] });
                        }
                    }
                    return postsArray;
                }),
                tap(responseData => {
                    this.createRecipes(responseData);
                }),
                catchError(errorRes => {
                    // Send to analytics server
                    return throwError(errorRes);
                })
            );
    }
}