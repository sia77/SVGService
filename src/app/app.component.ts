import { Component } from '@angular/core';
import { MainComponent } from "./components/main/main.component";

@Component({
  selector: 'app-root',
  //imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MainComponent]
})
export class AppComponent {
  title = 'initials-viewer';
}
