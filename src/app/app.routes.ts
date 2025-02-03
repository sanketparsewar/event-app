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
    path: 'my-booking',
    loadComponent: () => import('./home/my-booking/my-booking.page').then( m => m.MyBookingPage)
  },
  {
    path: 'my-booking/:id',
    loadComponent: () => import('./home/my-booking/my-booking.page').then( m => m.MyBookingPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./home/payment/payment.page').then( m => m.PaymentPage)
  },
  {
    path: 'ticket/:id',
    loadComponent: () => import('./home/ticket/ticket.page').then( m => m.TicketPage)
  },
];
