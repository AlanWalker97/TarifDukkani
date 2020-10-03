import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListSelectedItemComponent } from './shopping-edit/shopping-list-selected-item/shopping-list-selected-item.component';
import { ShoppingListComponent } from './shopping-list.component';

const routes:Routes =[
    { path: '', component: ShoppingListComponent, children:[
        {path: 'item/:id/:name', component:ShoppingListSelectedItemComponent}
        ] 
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ShoppingListRoutingModule{

}