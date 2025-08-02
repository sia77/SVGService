import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgService } from '../../services/svg.service';

@Component({
  selector: 'app-input-form',
  imports:  [MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent {

  constructor(private svgService:SvgService){}

  getUserFullName = new FormGroup({
    fullName: new FormControl('')
  });

  onSubmit() {
    const name = this.getUserFullName.value.fullName;
    console.log("name: ", name);

    if(name){
      this.svgService.getInitalsInSVG(name);
    }

  }
}
