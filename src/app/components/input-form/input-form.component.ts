import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  getUserFullName!:FormGroup;

  constructor(
    private svgService:SvgService, 
    private fb: FormBuilder
  ){
    this.getUserFullName = this.fb.group({
      fullName: ['', 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/)
        ]
      ]
    });
  }

  loading:boolean = false;
  private loadingTimeout: any;

  get fullNameControl() {
    return this.getUserFullName.get('fullName')!;
  }

  onSubmit() {

    if (this.getUserFullName.invalid) {
      this.getUserFullName.markAllAsTouched();
      return;
    }
    const name = this.getUserFullName.value.fullName;
    
    this.loadingTimeout = setTimeout(() => {
      this.loading = true;
    }, 2000);

    this.svgService.getInitalsInSVG(name).subscribe({
      next: () => {
        this.cleanupLoading();
        this.resetFormFieldAndError();
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

  private resetFormFieldAndError(){
    this.fullNameControl?.reset('', { emitEvent: false });
    this.fullNameControl?.setErrors(null);
    this.fullNameControl?.markAsPristine();
    this.fullNameControl?.markAsUntouched();
  }
}
