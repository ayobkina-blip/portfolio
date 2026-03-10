import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-envelope',
  imports: [CommonModule],
  templateUrl: './cv-envelope.html',
  styleUrl: './cv-envelope.css',
})
export class CvEnvelopeComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  opened = false;

  openEnvelope(): void {
    if (!this.opened) {
      this.opened = true;
    }
  }

  close(): void {
    this.opened = false;
    setTimeout(() => {
      this.isOpen = false;
      this.isOpenChange.emit(false);
    }, 300);
  }
}
