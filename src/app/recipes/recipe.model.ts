import { Ingredient } from '../shared/ingredient.model';
import { RecipeService } from './recipe.service';

export class Recipe{
    public id:number;
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];
    public errorImage:string="https://pixelz.cc/wp-content/uploads/2018/07/404-not-found-graffiti-uhd-4k-wallpaper.jpg";
    
    constructor(id:number,name:string, description:string, imagePath:string,ingredients:Ingredient[]){
        this.id=id;
        this.name=name;
        this.description=description;
        this.imagePath=imagePath;
        this.ingredients=ingredients;

    }
}