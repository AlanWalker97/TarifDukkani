import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list.service';

@Component({
  selector: 'app-shopping-list-selected-item',
  templateUrl: './shopping-list-selected-item.component.html',
  styleUrls: ['./shopping-list-selected-item.component.css']
})
export class ShoppingListSelectedItemComponent implements OnInit , OnDestroy{
  ingredientChangeSub:Subscription;
  ingredients:Ingredient[]=[];
  selectedId=0;
  constructor(private shoppingListService:ShoppingListService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();
    this.ingredientChangeSub= this.shoppingListService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{this.ingredients=ingredients});
    this.route.params.subscribe((params:Params) => {
      this.selectedId=params['id']-1;
  });
  }

  ngOnDestroy(){
    this.ingredientChangeSub.unsubscribe();
  }

  onDelete(){
    this.shoppingListService.removeIngredient(this.selectedId);
    this.router.navigate(['/shopping-list'],{relativeTo: this.route});
  }

}
