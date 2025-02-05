import { Routes } from '@angular/router';
import { authGuardGuard } from './guards/auth/auth-guard.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    // canActivate: [authGuardGuard], // Protect Home
  },
  {
    path: 'event/:id',
    loadComponent: () =>
      import('./home/event/event.page').then((m) => m.EventPage),
    // canActivate: [authGuardGuard], // Protect Event Page
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome.page').then((m) => m.WelcomePage),
  },
  {
    path: 'my-booking',
    loadComponent: () =>
      import('./home/my-booking/my-booking.page').then((m) => m.MyBookingPage),
    // canActivate: [authGuardGuard], // Protect My Bookings
  },
  {
    path: 'my-booking/:id',
    loadComponent: () =>
      import('./home/my-booking/my-booking.page').then((m) => m.MyBookingPage),
    // canActivate: [authGuardGuard],
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./home/payment/payment.page').then((m) => m.PaymentPage),
    // canActivate: [authGuardGuard], // Protect Payment Page
  },
  {
    path: 'ticket/:id',
    loadComponent: () =>
      import('./home/ticket/ticket.page').then((m) => m.TicketPage),
    // canActivate: [authGuardGuard], // Protect Tickets Page
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./home/profile/profile.page').then((m) => m.ProfilePage),
    // canActivate: [authGuardGuard], // Protect Profile Page
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    // canActivate: [authGuardGuard], // Redirects logged-in users away
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
];
