---
name: portfolio-ayob
description: Contexto completo del portfolio de Ayob El Kinani (Laravel + Angular). Usa esta skill cuando el usuario pida ayuda con su portfolio, cuando mencione proyectos, skills, errores de Laravel o Angular, cuando quiera añadir funcionalidades, arreglar bugs, o preguntar sobre la arquitectura del proyecto. Úsala siempre que el contexto del trabajo sea este portfolio específico.
---

# Portfolio de Ayob El Kinani — Contexto del Proyecto

## Quién es el desarrollador

**Nombre:** Ayob El Kinani  
**Rol:** Web Developer Jr.  
**Ubicación:** Algemesí, Valencia  
**Email:** ayobkina@gmail.com  
**LinkedIn:** linkedin.com/in/ayob-elkinani  
**Formación:** CFGS DAW (en curso, jun 2026) + CFGM SMR (finalizado jun 2024)  
**Idiomas:** Español nativo, Árabe nativo  

### Experiencia real
- **Policía Local de Algemesí** (feb–jun 2026): Desarrolló en solitario una app web interna con gestión de incidencias, inventario, armamento de ciudadanos y chat en tiempo real con WebSockets. Stack: Laravel 12, PHP, Blade, Tailwind, MySQL, WebSockets.
- **Infollop** (mar–jun 2024): Técnico informático, reparación de hardware/software, atención al cliente.

---

## Stack del proyecto

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Laravel + PHP | Laravel 12 |
| Frontend | Angular | 17+ |
| Datos | Archivos JSON estáticos | — |
| Estilos | Tailwind CSS | 3.x |
| Comunicación | API REST + JSON | — |

**No hay base de datos.** Los datos (proyectos, skills, experiencia) viven en archivos `.json` dentro de `storage/data/`. Laravel los lee y los devuelve como JSON a Angular.

---

## Arquitectura

```
frontend/ (Angular - puerto 4200)
    └── HttpClient → GET/POST → http://localhost:8000/api

backend/ (Laravel - puerto 8000)
    └── routes/api.php → Controllers → lee storage/data/*.json → devuelve JSON
```

**Regla importante:** Laravel NO renderiza vistas. Solo devuelve JSON. Angular es el único que renderiza HTML.

---

## Archivos de datos (storage/data/)

```
storage/data/
├── projects.json
├── skills.json
└── experience.json
```

### projects.json
```json
[
  {
    "id": 1,
    "title": "App Gestión Policía Local",
    "description": "Aplicación web interna desarrollada en solitario para la Policía Local de Algemesí. Incluye gestión de incidencias, inventario, armamento de ciudadanos y chat en tiempo real.",
    "short_desc": "App web interna para gestión operativa policial con chat en tiempo real.",
    "image": null,
    "tags": ["Laravel 12", "PHP", "Tailwind CSS", "MySQL", "WebSockets", "Blade"],
    "github_url": null,
    "demo_url": null,
    "featured": true,
    "order": 1
  },
  {
    "id": 2,
    "title": "Portfolio Personal",
    "description": "Portfolio fullstack con Laravel como API REST y Angular en el frontend.",
    "short_desc": "Portfolio fullstack Laravel + Angular.",
    "image": null,
    "tags": ["Laravel", "Angular", "Tailwind CSS", "TypeScript"],
    "github_url": null,
    "demo_url": null,
    "featured": true,
    "order": 2
  }
]
```

### skills.json
```json
[
  { "id": 1,  "name": "HTML / CSS",      "category": "frontend", "level": 90, "order": 1 },
  { "id": 2,  "name": "Blade",           "category": "frontend", "level": 85, "order": 2 },
  { "id": 3,  "name": "Tailwind CSS",    "category": "frontend", "level": 80, "order": 3 },
  { "id": 4,  "name": "JavaScript",      "category": "frontend", "level": 75, "order": 4 },
  { "id": 5,  "name": "Angular",         "category": "frontend", "level": 40, "order": 5 },
  { "id": 6,  "name": "Laravel / PHP",   "category": "backend",  "level": 85, "order": 1 },
  { "id": 7,  "name": "Eloquent ORM",    "category": "backend",  "level": 80, "order": 2 },
  { "id": 8,  "name": "API REST",        "category": "backend",  "level": 75, "order": 3 },
  { "id": 9,  "name": "MySQL",           "category": "backend",  "level": 70, "order": 4 },
  { "id": 10, "name": "WebSockets",      "category": "backend",  "level": 65, "order": 5 },
  { "id": 11, "name": "VS Code",         "category": "tools",    "level": 85, "order": 1 },
  { "id": 12, "name": "Git",             "category": "tools",    "level": 70, "order": 2 },
  { "id": 13, "name": "Linux",           "category": "tools",    "level": 65, "order": 3 },
  { "id": 14, "name": "Redes / Hardware","category": "tools",    "level": 65, "order": 4 }
]
```

### experience.json
```json
[
  {
    "id": 1,
    "company": "Policía Local de Algemesí",
    "role": "Desarrollador Web – Prácticas DAW",
    "description": "Desarrollé de forma independiente una aplicación web interna para la gestión operativa del cuerpo. Módulo de incidencias, control de materiales, registro de armamento y chat en tiempo real. Recogí requisitos con agentes y administrativos entregando mejoras de forma iterativa.",
    "tags": ["Laravel 12", "PHP", "Blade", "Tailwind CSS", "JavaScript", "MySQL", "WebSockets"],
    "start_date": "2026-02-01",
    "end_date": null,
    "location": "Algemesí · Presencial"
  },
  {
    "id": 2,
    "company": "Infollop",
    "role": "Técnico Informático",
    "description": "Reparación y optimización de equipos, impresoras y periféricos. Diagnóstico de fallos hardware y software, configuración de sistemas y atención directa al cliente.",
    "tags": ["Hardware", "Redes", "Windows", "Atención al cliente"],
    "start_date": "2024-03-01",
    "end_date": "2024-06-30",
    "location": "Algemesí · Presencial"
  }
]
```

---

## Endpoints de la API

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /api/projects | Lista proyectos | No |
| GET | /api/skills | Lista skills | No |
| GET | /api/experience | Lista experiencia | No |
| POST | /api/contact | Envía mensaje de contacto | No |

---

## Formato estándar de respuesta JSON (SIEMPRE este formato)

```json
// Éxito
{ "success": true, "data": [...], "message": "Descripción" }

// Error
{ "success": false, "data": null, "message": "Descripción del error" }
```

---

## Patrón de controllers (sin base de datos)

```php
// Ejemplo: ProjectController.php
public function index() {
    try {
        $data = json_decode(
            file_get_contents(storage_path('data/projects.json')), true
        );
        return response()->json([
            'success' => true,
            'data'    => $data,
            'message' => 'Proyectos obtenidos correctamente'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'data'    => null,
            'message' => 'Error al leer los datos'
        ], 500);
    }
}
```

Mismo patrón para `SkillController` y `ExperienceController`, cambiando el archivo JSON.

---

## Estructura de carpetas

### Backend (Laravel)
```
backend/
├── app/Http/Controllers/Api/
│   ├── ProjectController.php
│   ├── ExperienceController.php
│   ├── SkillController.php
│   └── ContactController.php
├── app/Exceptions/Handler.php     ← errores globales
├── storage/data/
│   ├── projects.json              ← datos reales
│   ├── skills.json
│   └── experience.json
└── routes/api.php
```

### Frontend (Angular)
```
frontend/src/app/
├── components/
│   ├── hero/
│   ├── about/
│   ├── projects/
│   ├── skills/
│   ├── experience/
│   └── contact/
├── services/
│   └── portfolio.service.ts
├── models/
│   ├── project.model.ts
│   ├── skill.model.ts
│   └── experience.model.ts
└── interceptors/
    └── error.interceptor.ts
```

---

## Manejo de errores — Laravel

### Códigos HTTP a usar
- `200` — OK
- `400` — Bad Request
- `404` — Not Found
- `422` — Validation Error
- `500` — Server Error

### Handler global (app/Exceptions/Handler.php)
```php
public function render($request, Throwable $exception) {
    if ($request->expectsJson()) {
        if ($exception instanceof ValidationException) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors'  => $exception->errors()
            ], 422);
        }
        return response()->json([
            'success' => false,
            'message' => 'Error interno del servidor'
        ], 500);
    }
    return parent::render($request, $exception);
}
```

---

## Manejo de errores — Angular

### Interceptor HTTP
```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ha ocurrido un error';
      switch (error.status) {
        case 0:   message = 'Sin conexión al servidor'; break;
        case 404: message = 'Recurso no encontrado'; break;
        case 422: message = error.error?.message || 'Error de validación'; break;
        case 500: message = 'Error del servidor'; break;
      }
      return throwError(() => ({ status: error.status, message }));
    })
  );
};
```

### Patrón en componentes
```typescript
data: Type[] = [];
loading = true;
error = false;

ngOnInit() {
  this.service.getData().subscribe({
    next: (res) => { this.data = res; this.loading = false; },
    error: () => { this.error = true; this.loading = false; }
  });
}
```

```html
@if (loading) { <p>Cargando...</p> }
@else if (error) { <p>Error al cargar los datos.</p> }
@else { <!-- contenido --> }
```

---

## CORS — config/cors.php
```php
'paths'                => ['api/*'],
'allowed_origins'      => ['http://localhost:4200'],
'allowed_methods'      => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
'allowed_headers'      => ['Content-Type', 'Authorization', 'Accept'],
'supports_credentials' => true,
```

---

## Interfaces TypeScript (models/)

```typescript
export interface Project {
  id: number; title: string; description: string;
  short_desc: string; image: string | null; tags: string[];
  github_url: string | null; demo_url: string | null;
  featured: boolean; order: number;
}

export interface Skill {
  id: number; name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: number; order: number;
}

export interface Experience {
  id: number; company: string; role: string; description: string;
  tags: string[]; start_date: string; end_date: string | null;
  location: string | null;
}

export interface ApiResponse<T> {
  success: boolean; data: T; message: string;
}
```

---

## Reglas y convenciones del proyecto

1. **Sin base de datos** — los datos viven en `storage/data/*.json`
2. **Formato JSON siempre con `success`, `data`, `message`** — sin excepciones
3. **Laravel solo devuelve JSON** — sin rutas web ni vistas Blade
4. **Angular maneja siempre 3 estados:** `loading`, `error`, `data`
5. **Los niveles de skills son del 0 al 100**
6. **Angular en inglés** (variables, componentes, interfaces)
7. **Laravel en inglés** (controllers) salvo mensajes de respuesta
8. **Tailwind para todos los estilos**
9. **El interceptor captura todos los errores HTTP** — no repetir lógica en cada componente

---

## Estado actual del proyecto

- [x] Backend Laravel creado
- [x] Archivos JSON con datos reales en storage/data/
- [x] Endpoints probados en Postman
- [x] CORS configurado
- [x] Frontend Angular creado
- [x] Interceptor de errores configurado
- [x] Componentes conectados con la API
- [ ] Diseño con Tailwind aplicado