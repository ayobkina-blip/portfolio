import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  imports: [ThemeToggleComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
    '(window:resize)': 'onWindowResize()',
  },
})
export class NavbarComponent {
  hasScrolled = signal(false);
  isMenuOpen = signal(false);

  onWindowScroll(): void {
    this.hasScrolled.set(window.scrollY > 10);
  }

  onWindowResize(): void {
    if (window.innerWidth >= 768 && this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
