import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card"
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserComponent, UserEditDialog } from './user/user.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    OrderComponent,
    CartComponent,
    ProductDetailComponent,
    UserLoginComponent,
    UserComponent,
    UserSignupComponent,
    UserEditDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
