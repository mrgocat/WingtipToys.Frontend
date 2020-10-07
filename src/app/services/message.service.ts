import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import {Observable} from 'rxjs';

import { Subject } from 'rxjs';

import { User } from '../user/user-signup/user.model';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly APIURL = "https://localhost:44317/"
  private readonly APIURLSSO = "https://localhost:44332/"

  private userNameUpdated = new Subject<string>(); // for raise event

  STORAGE_Cart = 'WingtipToys_CartId';
  STORAGE_Token = 'WingtipToys_Token';
  STORAGE_Name = 'WingtipToys_Name';
  constructor(private http: HttpClient, private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  getUserNameUpdateListener(){
    return this.userNameUpdated.asObservable();
  }
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
  updateCart(itemid, qty):Observable<any>{
    const cartItem = { cartId: this.getCartId(), id: itemid, quantity: qty};
    return this.http.patch<any>(this.APIURL + "api/v1/cart", cartItem);
  }
  removeCartItem(itemid):Observable<any>{
    return this.http.delete<any>(this.APIURL + "api/v1/cart/" + this.getCartId() + "/" + itemid);
  }
  public setCartId(cartId: string): void {
    const currentStorage = this.storage.get(this.STORAGE_Cart) || "";
    this.storage.set(this.STORAGE_Cart,cartId);
  }
  public getCartId(): string{
    const currentStorage = this.storage.get(this.STORAGE_Cart) || "";
    return currentStorage;
  }
  public setToken(cartId: string): void {
    const currentStorage = this.storage.get(this.STORAGE_Token) || "";
    this.storage.set(this.STORAGE_Token,cartId);
  }
  public getToken(): string{
    const currentStorage = this.storage.get(this.STORAGE_Token) || "";
    return currentStorage;
  }
  public setUserName(val: string): void {
    this.userNameUpdated.next(val);
    const currentStorage = this.storage.get(this.STORAGE_Name) || "";
    this.storage.set(this.STORAGE_Name,val);
  }
  public getUserName(): string{
    const currentStorage = this.storage.get(this.STORAGE_Name) || "";
    return currentStorage;
  }

  public createUser(user: User){
    //const request = { email: user.email, password: password, loginIp: ip };
    // alert(user.Email);
    return this.http.post<any>(this.APIURLSSO + "api/v1/users", user);
  }
  public updatePassword(data: any){
    const options = {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.getToken()
      })
    };
    return this.http.patch<any>(this.APIURLSSO + "api/v1/users", data, options);
  }
  public updateUser(userId: any, data: any){
    const options = {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.getToken()
      })
    };
    return this.http.patch<any>(this.APIURLSSO + "api/v1/users/" + userId, data, options);
  }
  public loginRequest(userid : string, password : string, ip: string){
    const request = { userid: userid, password: password, loginIp: ip };
    return this.http.post<any>(this.APIURLSSO + "api/v1/users/login", request);
  }
  public getUser(){
    const options = {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + this.getToken()
      })
    };

    return this.http.get<any>(this.APIURLSSO + "api/v1/users", options);
  }
  getIPAddress():Observable<any>{

    return this.http.get("http://api.ipify.org/?format=json");

  }
}
