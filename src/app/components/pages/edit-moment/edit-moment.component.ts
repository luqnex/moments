import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMoment } from '../../../interfaces/moment';
import { MomentService } from '../../../services/moment.service';
import { CommonModule } from '@angular/common';
import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  standalone: true,
  imports: [CommonModule, MomentFormComponent],
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css',
})
export class EditMomentComponent {
  moment?: IMoment;
  buttonText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getById(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async handleEdit(momentData: IMoment) {
    const id = this.moment?.id;

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.updateById(id!, formData).subscribe((response) => {
      this.messagesService.add('Momento editado com sucesso!');
      this.router.navigate(['/']);
    });
  }
}
