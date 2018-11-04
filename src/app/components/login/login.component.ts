import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }
  loginUser(e){
    e.preventDefault();
    console.log(e);
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    
    if(username == "admin" && password == "admin"){
      this.user.setUserLoggedIn();
      this.router.navigate(['customers']);
    }
  }

}
