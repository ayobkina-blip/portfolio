import { Component } from '@angular/core';

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
    email: 'ayobkina@gmail.com',
    linkedin: 'linkedin.com/in/ayob-elkinani',
    formation: 'CFGS DAW (en curso, jun 2026) + CFGM SMR (finalizado jun 2024)',
    languages: 'Español nativo, Árabe nativo'
  };
}
