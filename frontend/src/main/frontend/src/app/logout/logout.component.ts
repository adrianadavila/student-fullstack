import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'logout-app',
  template: `
  <button (click)="logout()">Logout</button>
  `
})
export class LogoutComponent {
  constructor(private route: ActivatedRoute,
    private router: Router) { }


    logout(){
    let link = ['/login'];
    this.router.navigate(link);
    }
}
