import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from "@angular/router";
import {MessageService} from '../../services/message.service';
import {NgForm} from "@angular/forms";
import {User} from "./user.model";

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  constructor(private service:MessageService, public route: ActivatedRoute, private router: Router) { }
  user : User = new User('', '', '', ''); //  = new User('abc@gmail.com', 'pwd', 'ray', 'kim');
  get diagnostic() { return JSON.stringify(this.user); }

  //userCreated = new EventEmitter();

  ngOnInit(): void {
  //  this.userCreated.subscribe();
  }
  public postCreated = new EventEmitter();
  onAddUser(form: NgForm){
    if(form.invalid){
      alert('Check inputs.')
      return;
    }

    //  userCreated = new EventEmitter<User>();
  //  const post: Post= {
  //    title: form.value.title,
  //    content: form.value.content
  //  }
  //  this.userCreated.emit(this.user);
    this.service.createUser(this.user).subscribe(res => {
      console.log(res);
      this.router.navigate(["/user/login"])
    }, (error) => {
      alert(error.error);
      console.dir(error);
    });
  //  form.resetForm();
  }
}
