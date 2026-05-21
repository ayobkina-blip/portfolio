import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements OnInit {
  data: Experience[] = [];
  loading = true;
  error = false;

  constructor(
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.portfolioService.getExperience().subscribe({
      next: (res) => {
        this.data = res.data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = true;
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  formatDateRange(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const startFormatted = `${months[start.getMonth()]} ${start.getFullYear()}`;
    
    if (end) {
      const endFormatted = `${months[end.getMonth()]} ${end.getFullYear()}`;
      return `${startFormatted} – ${endFormatted}`;
    } else {
      return `${startFormatted} – Actualidad`;
    }
  }
}
