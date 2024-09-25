import { Component } from '@angular/core';
import { TopnavComponent } from './global/topnav/topnav.component';
import { SidenavComponent } from './global/sidenav/sidenav.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopnavComponent, SidenavComponent, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  showFiller = false;
}
