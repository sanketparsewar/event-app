import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Function to retrieve token from cookies
  const getToken = (): string | null => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || null;
  };

  const token = getToken();

  if (token) {
    // If already logged in and trying to access /login, redirect to home
    if (state.url === '/login') {
      console.log('Already logged in. Redirecting to home...');
      router.navigateByUrl('/home');
      return false;
    }
    return true; // Allow access if authenticated
  }

  // If not logged in and trying to access a protected route, redirect to login
  const publicRoutes = ['/login', '/register', '/welcome'];
  if (!publicRoutes.includes(state.url)) {
    console.log('No token found. Redirecting to login...');
    router.navigateByUrl('/login');
    return false;
  }

  return true; // Allow access to public routes
};
