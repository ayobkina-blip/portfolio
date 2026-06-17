import { Component, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { IntroComponent } from './components/intro/intro';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ProjectsComponent } from './components/projects/projects';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { ContactComponent } from './components/contact/contact';
import { ThemeService } from './services/theme.service';
import { VercelAnalyticsService } from './services/vercel-analytics.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    IntroComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  title = 'portfolio-ayob';
  currentYear = new Date().getFullYear();

  private themeService = inject(ThemeService);
  private revealObserver: IntersectionObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private router = inject(Router);
  private vercelAnalytics = inject(VercelAnalyticsService);

  ngOnInit() {
    this.themeService.initAutoDetection();

    // Track initial load and subsequent route navigations
    try {
      // initial page
      this.vercelAnalytics.trackPageview(window.location.pathname + window.location.search);

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.vercelAnalytics.trackPageview(event.urlAfterRedirects);
        }
      });
    } catch (e) {
      // ignore in environments without Router
    }
  }

  ngAfterViewInit() {
    this.initRevealObserver();
    this.watchForNewElements();
  }

  ngOnDestroy() {
    this.revealObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  private initRevealObserver() {
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.revealObserver?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    this.observeRevealElements();
  }

  private observeRevealElements() {
    const elements = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible)');
    elements.forEach((el) => this.revealObserver?.observe(el));
  }

  private watchForNewElements() {
    this.mutationObserver = new MutationObserver(() => {
      this.observeRevealElements();
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}
