import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvEnvelopeComponent } from '../cv-envelope/cv-envelope';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, CvEnvelopeComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit, OnDestroy {
  emailCopied = signal(false);
  showCv = signal(false);

  // Typing animation
  private readonly phrases = [
    'Desarrollador Web Jr.',
    'Especialista en Laravel.',
    'Amante del producto real.',
    'Disponible para proyectos.',
  ];
  displayText = signal('');
  showCursor = signal(true);

  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;
  private cursorTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.runTyping();
    this.cursorTimer = setInterval(() => {
      this.showCursor.update(v => !v);
    }, 530);
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.cursorTimer) clearInterval(this.cursorTimer);
  }

  private runTyping(): void {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (!this.isDeleting) {
      this.charIndex++;
      this.displayText.set(currentPhrase.slice(0, this.charIndex));

      if (this.charIndex === currentPhrase.length) {
        // Pausa antes de borrar
        this.typingTimer = setTimeout(() => {
          this.isDeleting = true;
          this.runTyping();
        }, 1800);
        return;
      }
    } else {
      this.charIndex--;
      this.displayText.set(currentPhrase.slice(0, this.charIndex));

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      }
    }

    const speed = this.isDeleting ? 45 : 80;
    this.typingTimer = setTimeout(() => this.runTyping(), speed);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  copyEmail(): void {
    navigator.clipboard.writeText('ayobkina@gmail.com').then(() => {
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 3000);
    });
  }
}