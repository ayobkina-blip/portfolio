import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  // About section with static info from SKILL.md
  developerInfo = {
    name: 'Ayob El Kinani',
    role: 'Web Developer Jr.',
    location: 'Algemesí, Valencia',
    email: environment.email,
    linkedin: environment.linkedin,
    formation: 'CFGS DAW (en curso, jun 2026) + CFGM SMR (finalizado jun 2024)',
    languages: 'Español nativo, Árabe nativo'
  };
}
