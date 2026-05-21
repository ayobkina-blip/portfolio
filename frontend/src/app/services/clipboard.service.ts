import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  constructor() {}

  copyEmail(): Promise<boolean> {
    return navigator.clipboard.writeText(environment.email)
      .then(() => true)
      .catch(() => false);
  }

  getEmail(): string {
    return environment.email;
  }
}
