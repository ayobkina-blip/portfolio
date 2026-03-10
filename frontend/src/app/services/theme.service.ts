import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly theme$ = new BehaviorSubject<Theme>('light');
  
  constructor() {
    // Cargar tema guardado o preferencia del sistema
    const savedTheme = localStorage.getItem('theme') as Theme;
    let initialTheme: Theme;
    
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      initialTheme = savedTheme;
    } else {
      // Por defecto usar modo claro
      initialTheme = 'light';
    }
    
    // Aplicar tema inmediatamente antes de notificar
    this.applyTheme(initialTheme);
    this.theme$.next(initialTheme);
  }

  get theme() {
    return this.theme$.asObservable();
  }

  setTheme(theme: Theme) {
    this.theme$.next(theme);
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  toggleTheme() {
    const current = this.theme$.value;
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: Theme) {
    const root = document.documentElement;
    
    let shouldBeDark: boolean;
    if (theme === 'auto') {
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      shouldBeDark = theme === 'dark';
    }
    
    root.classList.toggle('dark', shouldBeDark);
  }

  // Para detectar cambios en preferencias del sistema
  initAutoDetection() {
    if (this.theme$.value === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        this.applyTheme('auto');
      });
    }
  }
}
