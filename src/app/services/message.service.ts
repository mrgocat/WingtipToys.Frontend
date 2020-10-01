import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {Observable} from 'rxjs';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly APIURL = "https://localhost:44317/"
  STORAGE_KEY = 'WingtipToys_Storage';
  constructor(private http: HttpClient, private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService) { }

    getProductCategory():Observable<any[]>{
      return this.http.get<any>(this.APIURL + "api/v1/product/category");
    }

  getProducts():Observable<any[]>{
    return this.http.get<any>(this.APIURL + "api/v1/product");
  }

  searchProducts(name, value):Observable<any[]>{
    return this.http.get<any>(this.APIURL + "api/v1/product?name=" + name + "&value=" + value);
  }

  getProduct(productId: string):Observable<any>{
  //  alert(this.APIURL + "api/v1/product/" + productId);
    return this.http.get<any>(this.APIURL + "api/v1/product/" + productId);
  }
  addCart(proId):Observable<any>{
    const cartItem = { productId: proId, cartId: this.getCartId(), quantity: 1 };
    return this.http.post<any>(this.APIURL + "api/v1/cart", cartItem);
  }
  getCartList():Observable<any[]>{
    return this.http.get<any>(this.APIURL + "api/v1/cart/" + this.getCartId());
  }

  public setCartId(cartId: string): void {
    const currentStorage = this.storage.get(this.STORAGE_KEY) || "";
    this.storage.set(this.STORAGE_KEY,cartId);
  }
  public getCartId(): string{
    const currentStorage = this.storage.get(this.STORAGE_KEY) || "";
    return currentStorage;
  }

}
