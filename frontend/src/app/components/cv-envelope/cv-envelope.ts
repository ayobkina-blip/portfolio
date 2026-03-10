import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
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

  /**
   * State machine:
   *  'closed'  → click envelope → 'opening' → 1100ms → 'open'
   *  'open'    → click X        → 'closing' →  450ms → 'closed' → 300ms → emit false
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

    // Step 1: play exit animation on CV viewer
    this.state = 'closing';

    // Step 2: after animation, reset to closed envelope
    this.timer = setTimeout(() => {
      this.state = 'closed';

      // Step 3: emit after envelope re-entrance settles
      this.timer = setTimeout(() => {
        this.isOpen = false;
        this.isOpenChange.emit(false);
      }, 300);
    }, 450);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}