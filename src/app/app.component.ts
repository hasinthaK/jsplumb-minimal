import { Component } from '@angular/core';
import { ROUTES } from './routing.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flow-poc';

  public ROUTES = ROUTES;
}
