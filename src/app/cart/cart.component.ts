import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import {MessageService} from '../services/message.service';
import { Router } from '@angular/router';

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
  updateCartItem(idx){

  }
  removeCartItem(idx){
    alert(idx);
  }
  trackCartItem(index, item){
    alert(index);
  }
}
