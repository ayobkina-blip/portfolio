// HTTP interceptor removed - no longer needed for static Angular application
// This file can be deleted as we're not using Laravel backend anymore

import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
