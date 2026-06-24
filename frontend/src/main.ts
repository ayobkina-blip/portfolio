import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { inject } from '@vercel/analytics';

import { inject as vercelInject } from '@vercel/analytics';

bootstrapApplication(App, appConfig)
  .then(() => {
    try {
      // Inject Vercel Web Analytics (no-op in development)
      vercelInject();
    } catch (e) {
      // ignore if package not available or inject fails in tests
    }
  })
  .catch((err) => console.error(err));

// Initialize Vercel Web Analytics
inject();
