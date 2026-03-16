import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
    console.log('Iniciando carga de skills...');
    
    // Datos fallback por si el JSON no carga
    const fallbackSkills: Skill[] = [
      { id: 1, name: "HTML / CSS", category: "frontend", level: 90, order: 1 },
      { id: 2, name: "Blade", category: "frontend", level: 85, order: 2 },
      { id: 3, name: "Tailwind CSS", category: "frontend", level: 80, order: 3 },
      { id: 4, name: "JavaScript", category: "frontend", level: 75, order: 4 },
      { id: 5, name: "Angular", category: "frontend", level: 40, order: 5 },
      { id: 6, name: "Laravel / PHP", category: "backend", level: 85, order: 1 },
      { id: 7, name: "Eloquent ORM", category: "backend", level: 80, order: 2 },
      { id: 8, name: "API REST", category: "backend", level: 75, order: 3 },
      { id: 9, name: "MySQL", category: "backend", level: 70, order: 4 },
      { id: 10, name: "WebSockets", category: "backend", level: 65, order: 5 },
      { id: 11, name: "VS Code", category: "tools", level: 85, order: 1 },
      { id: 12, name: "Git", category: "tools", level: 70, order: 2 },
      { id: 13, name: "Linux", category: "tools", level: 65, order: 3 },
      { id: 14, name: "Redes / Hardware", category: "tools", level: 65, order: 4 }
    ];
    
    // Intentar cargar desde el servicio
    this.portfolioService.getSkills().subscribe({
      next: (res) => {
        console.log('Skills response:', res);
        if (res && res.data && res.data.length > 0) {
          this.data = res.data;
          console.log('Skills cargadas desde JSON:', this.data.length);
        } else {
          console.log('Usando datos fallback');
          this.data = fallbackSkills;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando skills, usando fallback:', error);
        this.data = fallbackSkills;
        this.loading = false;
      }
    });
  }

  getByCategory(cat: string): Skill[] {
    return this.data.filter(s => s.category === cat);
  }

  // Convierte level (0-100) a puntos llenos de 5
  getDots(level: number): number[] {
    const filled = Math.round(level / 20);
    return Array.from({ length: 5 }, (_, i) => i < filled ? 1 : 0);
  }

  getLevelLabel(level: number): string {
    if (level >= 85) return 'Avanzado';
    if (level >= 70) return 'Sólido';
    if (level >= 55) return 'Intermedio';
    return 'Aprendiendo';
  }
}
