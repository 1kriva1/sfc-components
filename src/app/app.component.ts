import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sfc-components';

  loginActive = true;


  setLoginActive(loginActive) {
    this.loginActive = loginActive;
  }
}
