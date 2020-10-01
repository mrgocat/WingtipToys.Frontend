import { Component, OnInit } from '@angular/core';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isLoading = false;

  constructor(private service:MessageService) { }
  public productList = [];
  ngOnInit(): void {
    this.refreshProductList();
  }

  refreshProductList(){
    this.isLoading = true;
    this.service.getProducts().subscribe(data => {
      console.dir(data);
      this.productList = data;
      this.isLoading = false;
    });
  }
}
