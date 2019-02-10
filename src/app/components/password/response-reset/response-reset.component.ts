import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JarwisService } from "src/app/Services/jarwis.service";

@Component({
  selector: "app-response-reset",
  templateUrl: "./response-reset.component.html",
  styleUrls: ["./response-reset.component.css"]
})
export class ResponseResetComponent implements OnInit {
  public error = [];

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };
  constructor(
    private route: ActivatedRoute,
    private Jarwis: JarwisService,
    private router: Router
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params["token"];
    });
  } // end constructor

  ngOnInit() {}

  onSubmit() {
    this.Jarwis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.router.navigateByUrl("/login");
  }

  handleError(error) {}
}
