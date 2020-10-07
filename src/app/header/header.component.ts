import { Component, OnInit } from '@angular/core';
import {MessageService} from '../services/message.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = null;

  private userNameStub: Subscription;

  constructor(private service:MessageService) { }

  ngOnInit(): void {
    this.userName = this.service.getUserName();

    this.userNameStub = this.service.getUserNameUpdateListener()
      .subscribe((userName:string) => {
       this.userName = userName;
      });
  }
  ngOnDestory(){
    this.userNameStub.unsubscribe();
  }

}
