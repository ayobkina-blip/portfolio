import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  formData = {
    nombre: '',
    email: '',
    mensaje: '',
  };

  loading = signal(false);
  submitted = signal(false);
  error = signal(false);
  emailCopied = signal(false);
  currentYear = new Date().getFullYear();

  private portfolioService = inject(PortfolioService);
  private clipboardService = inject(ClipboardService);

  copyEmail(): void {
    this.clipboardService.copyEmail().then(() => {
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 3000);
    });
  }

  onSubmit(): void {
    this.loading.set(true);
    this.error.set(false);

    this.portfolioService.sendContact(this.formData).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
        this.formData = { nombre: '', email: '', mensaje: '' };
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(true);
        console.error('Contact form error:', err);
      },
    });
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
