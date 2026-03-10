import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEnvelopeComponent } from '../cv-envelope/cv-envelope';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, CvEnvelopeComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  emailCopied = false;
  showCv = false;

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  copyEmail(): void {
    navigator.clipboard.writeText('ayobkina@gmail.com').then(() => {
      this.emailCopied = true;
      setTimeout(() => this.emailCopied = false, 3000);
    });
  }
}