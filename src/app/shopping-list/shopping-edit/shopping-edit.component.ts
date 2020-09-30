import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router ,Event} from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  shoppingListForm:FormGroup;
  ingredientChangeSub:Subscription;
  constructor(private shoppingListService:ShoppingListService,private route:ActivatedRoute,private router:Router) {}
  onAdding(){
    this.shoppingListService.addIngredient(new Ingredient(this.shoppingListForm.value.name,this.shoppingListForm.value.amount));
  }
  onClearing(){
    this.shoppingListService.decreaseIngredientAmount(new Ingredient(this.shoppingListForm.value.name,this.shoppingListForm.value.amount));
    this.router.navigate(['/shopping-list'],{relativeTo: this.route});
  }
  ngOnInit(): void {
    this.shoppingListForm = new FormGroup({
      'name': new FormControl(null,[Validators.required,Validators.minLength(2)]),
      'amount': new FormControl(null, [Validators.required,Validators.min(1)])
    });
    this.ingredientChangeSub = this.shoppingListService.ingredientsChanged.subscribe(()=>{this.shoppingListForm.reset();});
  }
  ngOnDestroy(){
    this.ingredientChangeSub.unsubscribe();
  }

}
