import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from "./product/product.component";
import { OrderComponent } from "./order/order.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { CartComponent } from "./cart/cart.component";

const routes: Routes = [
  { path:'',  component: ProductComponent },
  { path:'product',  component: ProductComponent },
  { path:'productdetail/:productId',  component: ProductDetailComponent },
  { path:'cart',  component: CartComponent },
  { path:'order',  component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
