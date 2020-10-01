import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import {MessageService} from '../services/message.service';
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public isLoading = true;
  cartList = [];

  constructor(public service: MessageService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.refreshCartList();
  }
  refreshCartList(){
    this.isLoading = true;
    this.service.getCartList().subscribe(data => {
      console.dir(data);
      this.cartList = data;
      this.isLoading = false;
    });
  }
  updateCartItem(id, value){
   // alert(id + ", " + value);
    let qty = Number(value);
    if(qty < 1){
      alert("Need positive value!");
      return;
    }
    this.service.updateCart(id, qty).subscribe(data => {

      this.refreshCartList();

    });
  }
  removeCartItem(id){
    this.service.removeCartItem(id).subscribe(data => {

      this.refreshCartList();

    });

  }

}
