import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IMoment } from '../../interfaces/moment';

@Component({
  selector: 'app-moment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css',
})
export class MomentFormComponent {
  @Input() buttonText: string = '';
  @Output() onSubmit = new EventEmitter<IMoment>();

  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.momentForm.get('title');
  }

  get description() {
    return this.momentForm.get('description');
  }

  handleChangeImage(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      this.momentForm.patchValue({ image: file });
    }
  }

  handleSubmit() {
    if (this.momentForm.invalid) return;

    console.log('submit', this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }
}
