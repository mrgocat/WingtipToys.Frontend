import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from "@angular/router";
import {MessageService} from '../services/message.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgForm} from "@angular/forms";

export interface DialogData {
  key: string;
  value: string;
  oldValue: string;
  title: string;
  validationMsg: string;
  patternStr:string;
  success:boolean
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service:MessageService, public route: ActivatedRoute
    , private router: Router, public dialog: MatDialog) { }

  userInfo = null;
  key: string;
  value: string;
  title: string;
  validationMsg: string;
  patternStr: string;

  ngOnInit(): void {
    let token = this.service.getToken();
    if(token == ""){
      this.router.navigate(['/user/login']);
    }else{
      this.loadUserInfo();
    }
  }
  loadUserInfo(){
    this.service.getUser().subscribe(data => {
      console.dir(data);
      this.userInfo = data;
    }, error => {
      this.router.navigate(['/user/login']);
    });
  }
  editUser(key:string, value: string){
  //  alert(key + ", " + value);
    this.key = key;
    this.value = value;
    this.title = key;

    if(key == 'Password'){
      this.patternStr = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.source;
      this.validationMsg = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.";
    }else if(key == 'Email'){
      this.patternStr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.source;
      this.validationMsg = "Please input valid email address.";
    }else if(key == 'FirstName'){
      this.patternStr = "";
      this.title = "First Name"
      this.validationMsg = "First Name is required.";
    }else if(key == 'LastName'){
      this.patternStr = "";
      this.title = "Last Name"
      this.validationMsg = "Last Name is required.";
    }else{
      return;
    }

    const dialogRef = this.dialog.open(UserEditDialog, {
      width: '400px',
      data: {key: this.key, patternStr: this.patternStr, value: this.value, oldValue: '', title: this.title,
        validationMsg: this.validationMsg, success: false},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.dir(result);
      if(result !== undefined){
        if(result.success){
          alert("updated!!");
          this.loadUserInfo();
        }else{

        }
      }
    });
  }

}



@Component({
  selector: 'user-edit-dialog',
  templateUrl: 'user-edit-dialog.html',
})
export class UserEditDialog {

  constructor(private service:MessageService,
    public dialogRef: MatDialogRef<UserEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

  onClose(): void {
    this.dialogRef.close();
  }
  onSubmit(valueX): void {
    if(valueX.valid){
      if(this.data.key == 'Password'){
        const params = { oldPassword : this.data.oldValue, newPassword : this.data.value};
        this.service.updatePassword(params).subscribe(result => {
          console.dir(result);
          this.data.success = true;
          this.dialogRef.close(this.data);
        }, error => {
          console.dir(error);
          alert(JSON.stringify(error.errors));
        });
      }else{
        const params = { key : this.data.key, value : this.data.value};
        this.service.updateUser('username', params).subscribe(result => {
          console.dir(result);
          this.data.success = true;
          this.dialogRef.close(this.data);
        }, error => {
          console.dir(error);
          alert(JSON.stringify(error));
        });
      }

    }else{
      alert('Check input values.');
    }
  }

}

