import { Component } from '@angular/core';
import { InputFormComponent } from "../input-form/input-form.component";
import { SvgInitialDisplayComponent } from "../svg-initial-display/svg-initial-display.component";

@Component({
  selector: 'app-main',
  imports: [InputFormComponent, SvgInitialDisplayComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent { 

}
