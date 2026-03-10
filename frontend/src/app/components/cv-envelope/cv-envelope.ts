import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cv-envelope',
  imports: [CommonModule],
  templateUrl: './cv-envelope.html',
  styleUrl: './cv-envelope.css',
})
export class CvEnvelopeComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  envelopeVisible = true;
  thrown          = false;
  cvVisible       = false;
  cvIn            = false;
  cvOut           = false;
  closing         = false;

  pdfUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/CV_pdf.pdf');
  }

  throwEnvelope(): void {
    if (this.thrown) return;

    // Step 1: Seal breaks + envelope starts flying
    this.thrown = true;

    // Step 2: Show CV while envelope is still flying off screen
    setTimeout(() => {
      this.cvVisible = true;
      // Small delay so Angular renders the element before adding animation class
      setTimeout(() => { this.cvIn = true; }, 30);
    }, 350);

    // Step 3: Remove envelope from DOM after throw animation ends
    setTimeout(() => {
      this.envelopeVisible = false;
    }, 700);
  }

  close(): void {
    if (this.closing) return;
    this.closing = true;

    // CV folds back down
    this.cvIn  = false;
    this.cvOut = true;

    // Remove CV + close modal after fold animation
    setTimeout(() => {
      this.cvVisible       = false;
      this.cvOut           = false;
      this.envelopeVisible = true;
      this.thrown          = false;
      this.closing         = false;
      this.isOpen          = false;
      this.isOpenChange.emit(false);
    }, 500);
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}