import { Component, EventEmitter, Input, Output, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cv-envelope',
  imports: [CommonModule],
  templateUrl: './cv-envelope.html',
  styleUrls: ['./cv-envelope.css'],
})
export class CvEnvelopeComponent implements OnDestroy {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.state === 'open') {
      this.close();
    } else if (this.state === 'closed' && this.isOpen) {
      this.isOpen = false;
      this.isOpenChange.emit(false);
    }
  }

  /**
   * State machine:
   *  'closed'  → click envelope → 'opening' → 1100ms → 'open'
   *  'open'    → click X        → 'closing' →  420ms → 'closed' + emit false
   */
  state: 'closed' | 'opening' | 'open' | 'closing' = 'closed';
  pdfUrl: SafeResourceUrl;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/CV.pdf');
  }

  /** Envelope scene shown while not yet fully open */
  get isEnvelopeVisible(): boolean {
    return this.state === 'closed' || this.state === 'opening';
  }

  /** CV viewer shown while open OR animating out */
  get isCvVisible(): boolean {
    return this.state === 'open' || this.state === 'closing';
  }

  openEnvelope(): void {
    if (this.state !== 'closed') return;
    this.state = 'opening';
    this.timer = setTimeout(() => {
      this.state = 'open';
    }, 1100);
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    if (this.state !== 'open') return;
    if (this.timer) clearTimeout(this.timer);

    this.state = 'closing';

    this.timer = setTimeout(() => {
      this.state = 'closed';
      this.isOpen = false;
      this.isOpenChange.emit(false);
    }, 420);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}