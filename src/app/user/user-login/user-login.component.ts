import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from "@angular/router";
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private service:MessageService, public route: ActivatedRoute, private router: Router) { }
  ipAddress = "";
  ngOnInit(): void {
    this.getIPAddress();
  }
  updateCartItem(id, value){
    /* alert(id + ", " + value);
     let qty = Number(value);
     if(qty < 1){
       alert("Need positive value!");
       return;
     }
     this.service.updateCart(id, qty).subscribe(data => {

       this.refreshCartList();

     });*/
   }
   loginRequest(userId, password){

    this.service.loginRequest(userId, password, this.ipAddress).subscribe(data => {
      this.service.setToken(data.token);
      this.service.setUserName(data.username);

      this.router.navigate(['/user']);
    });
  }
   getIPAddress(){
    this.service.getIPAddress().subscribe((res:any)=>{

      this.ipAddress = res.ip;

    });

  }
}
