import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListSelectedItemComponent } from './shopping-edit/shopping-list-selected-item/shopping-list-selected-item.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';



@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
        ShoppingListSelectedItemComponent
    ],
    imports:[
        RouterModule,
        ReactiveFormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ]
})
export class ShoppingListModule{}