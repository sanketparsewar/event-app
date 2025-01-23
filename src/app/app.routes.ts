import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'event/:id',
    loadComponent: () =>
      import('./home/event/event.page').then((m) => m.EventPage),
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
    path: 'booking',
    loadComponent: () => import('./home/booking/booking.page').then( m => m.BookingPage)
  },
];
