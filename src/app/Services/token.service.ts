import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TokenService {

  private iss = {
    login : 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  }

  constructor() {}

  //step  3
  handle(token) {
    this.set(token);

  }

    //step 4
  set(token) {
    localStorage.setItem("token", token);
  }

//step 5
  get() {
    return localStorage.getItem("token"); // token  head.payload.signature
  }

  remove() {
    localStorage.removeItem("token");
  }


//step 6
  isValid() {
    const token = this.get();

    if (token) {

      const payload = this.payload(token);

      console.log('payload='+payload);

      if(payload){

        console.log('payload.iss ='+payload.iss);

        return Object.values(this.iss).indexOf(payload.iss)  > -1 ? true : false;

      }
    }
    return false;
  }

//step 7
  payload(token) {

    const payload = token.split(".")[1];
    return this.decode(payload);
  }


//step 8
  decode(payload) {
    return JSON.parse(atob(payload));
  }


loggedIn(){
  return this.isValid();
}

}
