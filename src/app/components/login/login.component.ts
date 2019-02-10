import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JarwisService } from "src/app/Services/jarwis.service";
import { Token } from "@angular/compiler";
import { TokenService } from "src/app/Services/token.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService, 
    private Token: TokenService,
    private router: Router,
    private Auth:AuthService
    ) {}

  //step 1
  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  //step 2
  handleResponse(data) {
    this.Token.handle(data.access_token);
 
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile')
  }

  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {}
}
