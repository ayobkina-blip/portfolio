import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent implements OnInit {
  data: Skill[] = [];
  loading = true;
  error = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getSkills().subscribe({
      next: (res) => {
        this.data = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  getSkillIcon(skillName: string): string {
    const icons: { [key: string]: string } = {
      'HTML / CSS': '🌐',
      'Blade': '🔪',
      'Tailwind CSS': '🎨',
      'JavaScript': '⚡',
      'Angular': '🅰️',
      'Laravel / PHP': '🐘',
      'Eloquent ORM': '🗃️',
      'API REST': '🔌',
      'MySQL': '🗄️',
      'WebSockets': '🌐',
      'VS Code': '💻',
      'Git': '📦',
      'Linux': '🐧',
      'Redes / Hardware': '🔧'
    };
    
    return icons[skillName] || '💡';
  }
}
