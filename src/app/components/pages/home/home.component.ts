import { Component } from '@angular/core';

import { MomentService } from '../../../services/moment.service';
import { IMoment } from '../../../interfaces/moment';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  allMoments: IMoment[] = [];
  moments: IMoment[] = [];
  baseApiUrl: string = environment.baseApiUrl;

  faSearch = faSearch;
  searchFilter: string = '';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getAllMoments().subscribe((response) => {
      const data = response.data;
      const formattedData = data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at!).toLocaleDateString('pt-BR'),
      }));

      this.allMoments = formattedData;
      this.moments = formattedData;
    });
  }

  handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    const momentsFiltered = this.allMoments.filter((moment) => {
      return moment.title.toLocaleLowerCase().includes(value);
    });

    this.moments = momentsFiltered;
  }
}
