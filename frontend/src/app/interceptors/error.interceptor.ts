import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: any) => {
      let message = 'Ha ocurrido un error';
      
      switch (error.status) {
        case 0:
          message = 'Sin conexión al servidor';
          break;
        case 404:
          message = 'Recurso no encontrado';
          break;
        case 422:
          message = error.error?.message || 'Error de validación';
          break;
        case 500:
          message = 'Error del servidor';
          break;
      }
      
      return throwError(() => ({ status: error.status, message }));
    })
  );
};

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
