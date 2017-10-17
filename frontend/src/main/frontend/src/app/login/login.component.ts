import { Component} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-login',
  template: `
  <section >
    <h2>Hi! In order to see the full list of students, please login</h2>
  </section>

  <button (click)="login()">Login</button>
  `,
  styles: []
})
export class LoginComponent {
  constructor(private route: ActivatedRoute,
              private router: Router) { }


  login(){
    let link = ['/students'];
    this.router.navigate(link);
  }

}
