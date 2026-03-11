import { Component, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';



@Component({

  selector: 'app-navbar',

  imports: [CommonModule, ThemeToggleComponent],

  templateUrl: './navbar.html',

  styleUrl: './navbar.css',

})

export class NavbarComponent {
  hasScrolled = false;
  isMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.hasScrolled = window.scrollY > 10;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth >= 768 && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Cerrar menú móvil después de navegar
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}

