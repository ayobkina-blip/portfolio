import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { Experience } from '../models/experience.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<ApiResponse<Project[]>> {
    return this.http.get<ApiResponse<Project[]>>(`${this.apiUrl}/projects`)
      .pipe(
        tap(response => console.log('Respuesta API Projects:', response))
      );
  }

  getSkills(): Observable<ApiResponse<Skill[]>> {
    return this.http.get<ApiResponse<Skill[]>>(`${this.apiUrl}/skills`)
      .pipe(
        tap(response => console.log('Respuesta API Skills:', response))
      );
  }

  getExperience(): Observable<ApiResponse<Experience[]>> {
    return this.http.get<ApiResponse<Experience[]>>(`${this.apiUrl}/experience`)
      .pipe(
        tap(response => console.log('Respuesta API Experience:', response))
      );
  }

  sendContact(formData: { nombre: string; email: string; mensaje: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/contact`, formData)
      .pipe(
        tap(response => console.log('Respuesta API Contact:', response))
      );
  }
}
