import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';

interface IntroChar {
  readonly char: string;
  readonly delay: number;
}

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.html',
  styleUrl: './intro.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements OnInit, OnDestroy {
  visible = signal(true);
  leaving = signal(false);
  progress = signal(0);

  readonly panels = [0, 1, 2, 3, 4, 5];
  readonly chars: IntroChar[] = this.buildChars('Ayob El Kinani');

  private raf: number | null = null;
  private timers: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    const root = document.documentElement;

    // El script inline de index.html decide si la intro debe mostrarse
    // (primera visita de la sesión y sin prefers-reduced-motion).
    if (!root.classList.contains('is-loading')) {
      this.visible.set(false);
      return;
    }

    document.body.classList.add('intro-lock');
    this.startProgress();
  }

  ngOnDestroy(): void {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    for (const t of this.timers) clearTimeout(t);
    document.body.classList.remove('intro-lock');
  }

  private buildChars(text: string): IntroChar[] {
    return text.split('').map((c, i) => ({
      char: c === ' ' ? '\u00A0' : c,
      delay: 260 + i * 45,
    }));
  }

  private startProgress(): void {
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number): void => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.progress.set(Math.round(eased * 100));

      if (t < 1) {
        this.raf = requestAnimationFrame(tick);
      } else {
        this.raf = null;
        this.finish();
      }
    };

    this.raf = requestAnimationFrame(tick);
  }

  private finish(): void {
    this.timers.push(
      setTimeout(() => {
        this.leaving.set(true);

        this.timers.push(
          setTimeout(() => {
            const root = document.documentElement;
            root.classList.remove('is-loading');
            root.classList.add('is-loaded');
            document.body.classList.remove('intro-lock');
            try {
              sessionStorage.setItem('introSeen', '1');
            } catch {
              // sessionStorage puede no estar disponible (modo privado)
            }
            this.visible.set(false);
          }, 1050)
        );
      }, 420)
    );
  }
}
