import { Component, OnInit } from '@angular/core';
import {MessageService} from '../services/message.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isLoading = false;
  name:string
  value:string;
  isQuery = false;

  constructor(private service:MessageService, public route: ActivatedRoute, private router: Router) { }
  public categoryList = [];
  public productList = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.dir(params);
      this.name = params.name;
      this.value = params.value;
    //  alert(this.name + " " + this.value);
      if(this.name != undefined && this.value != undefined){
        if(this.name == 'name'){
          if(this.value.length < 2){
            this.value = "";
            this.name = "";
          }else{
            this.isQuery = true;
          }
        }else if(this.name == 'category'){
          this.isQuery = true;
        }
      }

    });
    this.loadCategoryList();
 //   alert(this.name + " " + this.value);
    this.refreshProductList();
  }
  loadCategoryList(){
    this.service.getProductCategory().subscribe(data => {
      this.categoryList = data;
    });
  }
  refreshProductList(){
    if(this.isQuery){
      this.isLoading = true;
      this.service.searchProducts(this.name, this.value).subscribe(data => {
        console.dir(data);
        this.productList = data;
        this.isLoading = false;
      });
    }else{
      this.isLoading = true;
      this.service.getProducts().subscribe(data => {
        console.dir(data);
        this.productList = data;
        this.isLoading = false;
      });
    }

  }
  searchByName(value){
    if(value.length < 2){
      alert('You need to input at least 2 characters.');
      this.value = "";
      this.name = "";
      return;
    }

    this.isQuery = true;
    this.name = "name";
    this.value = value;
    this.refreshProductList();
  }
  searchByCategory(value){
    this.isQuery = true;
    this.name = "category";
    this.value = value;
    this.refreshProductList();
  }
}
