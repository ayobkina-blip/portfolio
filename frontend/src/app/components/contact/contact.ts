import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
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

  constructor(private portfolioService: PortfolioService) {}

  copyEmail(): void {
    navigator.clipboard.writeText('ayobkina@gmail.com').then(() => {
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
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }
}
