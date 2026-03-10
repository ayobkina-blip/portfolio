import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { Experience } from '../models/experience.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<ApiResponse<Project[]>> {
    return this.http.get<Project[]>('assets/data/projects.json').pipe(
      map(data => ({
        success: true,
        data: data,
        message: 'Projects loaded successfully'
      }))
    );
  }

  getSkills(): Observable<ApiResponse<Skill[]>> {
    return this.http.get<Skill[]>('assets/data/skills.json').pipe(
      map(data => ({
        success: true,
        data: data,
        message: 'Skills loaded successfully'
      }))
    );
  }

  getExperience(): Observable<ApiResponse<Experience[]>> {
    return this.http.get<Experience[]>('assets/data/experience.json').pipe(
      map(data => ({
        success: true,
        data: data,
        message: 'Experience loaded successfully'
      }))
    );
  }

  sendContact(formData: { nombre: string; email: string; mensaje: string }): Observable<ApiResponse<any>> {
    const formspreeData = {
      name: formData.nombre,
      email: formData.email,
      message: formData.mensaje
    };

    return this.http.post('https://formspree.io/f/mlgpjavk', formspreeData).pipe(
      map(() => ({
        success: true,
        data: null,
        message: 'Message sent successfully'
      }))
    );
  }
}
