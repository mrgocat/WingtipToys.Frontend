import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import {MessageService} from '../../services/message.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public isLoading = true;
  productId = "";
  product = null;

  constructor(public service: MessageService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.productId = paramMap.get("productId");
        this.isLoading = true;
        this.service.getProduct(this.productId).subscribe(data => {
          console.dir(data);
          this.product = data;
          this.isLoading = false;
        });
      } else {
        //this.route.
      }
    });

  }
/*
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
*/
  public goCategoryList(){
    this.router.navigate(['/product'], {
      queryParams: { name: 'category', value: this.product.categoryId}
    });
  }
  public addToCart(){
    if(this.product == null) return;
    this.service.addCart(this.product.id).subscribe(data => {
      console.dir(data);
      this.service.setCartId(data.cartId);
    //  this.openDialog();
      let res = confirm('Succefully added to cart. Do you want to move to shopping cart?');
      if(res) this.router.navigate(['/cart']);
    });
  }
}
/*
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: '../../cart/check-cart-dialog.html',
})
export class DialogContentExampleDialog {}
*/
