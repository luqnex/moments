import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { IMoment } from '../../../interfaces/moment';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-new-moment',
  standalone: true,
  imports: [MomentFormComponent, CommonModule],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css',
})
export class NewMomentComponent {
  buttonText: string = 'Compartilhar!';

  constructor(private momentService: MomentService) {}

  handleCreateMoment(moment: IMoment) {
    console.log('deu bom', moment);

    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe();
  }
}
