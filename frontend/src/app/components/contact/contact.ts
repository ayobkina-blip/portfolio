import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ClipboardService } from '../../services/clipboard.service';
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  formData = {
    nombre: '',
    email: '',
    mensaje: ''
  };
  
  loading = false;
  submitted = false;
  error = false;
  currentYear = new Date().getFullYear();
  emailCopied = false;

  private portfolioService = inject(PortfolioService);
  private clipboardService = inject(ClipboardService);

  copyEmail(): void {
    this.clipboardService.copyEmail().then(() => {
      this.emailCopied = true;
      setTimeout(() => this.emailCopied = false, 3000);
    });
  }

  onSubmit() {
    this.loading = true;
    this.error = false;
    
    this.portfolioService.sendContact(this.formData).subscribe({
      next: (res: ApiResponse<any>) => {
        this.loading = false;
        this.submitted = true;
        this.formData = { nombre: '', email: '', mensaje: '' };
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        console.error('Contact form error:', error);
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
