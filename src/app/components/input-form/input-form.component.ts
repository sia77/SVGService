import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgService } from '../../services/svg.service';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-input-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent {

  constructor(private svgService:SvgService){}

  loading:boolean = false;
  private loadingTimeout: any;

  getUserFullName = new FormGroup({
    fullName: new FormControl('')
  });

  onSubmit() {
    const name = this.getUserFullName.value.fullName;
    if (!name) return;

    
    this.loadingTimeout = setTimeout(() => {
      this.loading = true;
    }, 2000);

    this.svgService.getInitalsInSVG(name).subscribe({
      next: () => {
        this.cleanupLoading();
        this.getUserFullName.get('fullName')?.setValue('');
      },
      error: (err:any) => {
        console.log(`${err}`);
        new Error(`API error: ${err}`);
        this.cleanupLoading();
      }
    });
  }

  private cleanupLoading() {
    clearTimeout(this.loadingTimeout);
    this.loading = false;
  }
}
