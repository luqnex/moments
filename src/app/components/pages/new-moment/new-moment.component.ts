import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { IMoment } from '../../../interfaces/moment';
import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-new-moment',
  standalone: true,
  imports: [MomentFormComponent, CommonModule],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css',
})
export class NewMomentComponent {
  buttonText: string = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router
  ) {}

  handleCreateMoment(moment: IMoment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe(
      (result) => {
        this.messageService.add('Novo momento adicionado com sucesso!');
        this.router.navigate(['/']);
      },
      (error) => {
        this.messageService.add('Ocorreu um erro ao adicionar o momento!');
      }
    );
  }
}
