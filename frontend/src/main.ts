import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { inject } from '@vercel/analytics';
import { environment } from './environments/environment';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

// Initialize Vercel Analytics
inject({
  mode: environment.production ? 'production' : 'development'
});
