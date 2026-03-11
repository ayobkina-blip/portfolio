import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="toggleTheme()" 
      (keydown.enter)="toggleTheme()"
      (keydown.space)="toggleTheme()"
      class="relative w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
      [class]="themeClasses"
      [attr.aria-label]="ariaLabel"
      [attr.aria-pressed]="currentTheme === 'dark'"
      role="switch"
      type="button">
      
      @if (currentTheme !== 'dark') {
        <!-- Icono sol -->
        <svg 
          class="w-5 h-5 transition-all duration-300" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        </svg>
      } @else {
        <!-- Icono luna -->
        <svg 
          class="w-5 h-5 transition-all duration-300" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
        </svg>
      }
    </button>
  `,
  styleUrls: ['./theme-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  private subscription: Subscription | null = null;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.subscription = this.themeService.theme.subscribe(theme => {
      this.currentTheme = theme === 'dark' ? 'dark' : 'light';
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get themeClasses() {
    const baseClasses = 'focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    if (this.currentTheme === 'dark') {
      return `${baseClasses} bg-gray-800 border-gray-600 text-yellow-400 hover:bg-gray-700 hover:border-gray-500 focus:ring-yellow-400/50 focus:ring-offset-gray-900`;
    } else {
      return `${baseClasses} bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 focus:ring-blue-500/50 focus:ring-offset-white`;
    }
  }

  get ariaLabel() {
    return this.currentTheme === 'dark' 
      ? 'Cambiar a modo claro (desactivar modo oscuro)' 
      : 'Cambiar a modo oscuro (activar modo oscuro)';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
