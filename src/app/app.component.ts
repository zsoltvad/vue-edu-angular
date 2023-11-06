import { Component } from '@angular/core';

import { APP_TITLE } from './constants/title';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  APP_TITLE = APP_TITLE;
}
