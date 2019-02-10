import { Component, OnInit } from "@angular/core";
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient } from "@angular/common/http";
import { JarwisService } from "src/app/Services/jarwis.service";
import { TokenService } from "src/app/Services/token.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public errorX = [];

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router
    ) {}

  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(errorA) {
    this.errorX = errorA.error.errors;
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile')
  }

  ngOnInit() {}
} // end Class SignupComponent
