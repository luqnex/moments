import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { IMoment } from '../../../interfaces/moment';
import { MomentService } from '../../../services/moment.service';
import { environment } from '../../../../environments/environment';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [CommonModule, FaIconComponent, RouterLink],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
})
export class MomentComponent {
  moment?: IMoment;
  baseApiUrl: string = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getById(id)
      .subscribe((moment) => (this.moment = moment.data));
  }

  handleDelete(id: number) {
    this.momentService.deleteById(id).subscribe();

    this.messagesService.add('Momento excluído com sucesso!');

    this.router.navigate(['/']);
  }
}
