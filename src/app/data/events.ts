import { Ievent } from '../interfaces/event.interface';

export const events: Ievent[] = [
  {
    id: 1,
    name: 'Rock Festival 2025',
    date: new Date('2025-06-15'),
    image: 'assets/images/jazz.jpeg',
    location: 'Madison Square Garden, New York',
    headliners: ['The Rolling Stones', 'Foo Fighters'],
    performers: ['The Killers', 'Imagine Dragons', 'Green Day'],
    categoryId: '1',
    description:
      'Join us for an unforgettable night of rock music with legendary bands and upcoming artists.',
  },
  {
    id: 2,
    name: 'Tech Expo 2025',
    date: new Date('2025-09-10'),
    image: 'assets/images/jazz.jpeg',
    location: 'Silicon Valley Convention Center, California',
    categoryId: '2',
    description:
      'Explore the latest innovations in technology and connect with industry leaders.',
  },
  {
    id: 3,
    name: 'Food Carnival 2025',
    date: new Date('2025-04-22'),
    image: 'assets/images/jazz.jpeg',
    location: 'Downtown Park, Chicago',
    performers: ['Celebrity Chefs', 'Live Cooking Shows'],
    categoryId: '4',
    description:
      'A feast for the senses featuring cuisines from around the world and live cooking shows.',
  },
  {
    id: 4,
    name: 'Art Exhibition 2025',
    date: new Date('2025-07-05'),
    image: 'assets/images/jazz.jpeg',
    location: 'Modern Art Museum, Los Angeles',
    categoryId: '5',
    description:
      'A showcase of contemporary art by renowned and emerging artists.',
  },
  {
    id: 5,
    name: 'Jazz Night 2025',
    date: new Date('2025-03-18'),
    image: 'assets/images/jazz.jpeg',
    location: 'Blue Note Jazz Club, New York',
    headliners: ['John Coltrane Tribute Band'],
    performers: ['Local Jazz Quartet', 'Smooth Saxophonists'],
    categoryId: '1',
    description: 'An evening of smooth and soulful jazz music.',
  },
  {
    id: 6,
    name: 'Startup Meetup 2025',
    date: new Date('2025-11-12'),
    image: 'assets/images/jazz.jpeg',
    location: 'Tech Hub Auditorium, Seattle',
    categoryId: '5',
    description:
      'Network with founders, investors, and mentors at the biggest startup event of the year.',
  },
  {
    id: 7,
    name: 'Yoga Retreat 2025',
    date: new Date('2025-08-08'),
    image: 'assets/images/jazz.jpeg',
    location: 'Serenity Beach, Bali',
    performers: ['Renowned Yoga Instructors'],
    categoryId: '2',
    description:
      'Reconnect with your inner self at this relaxing and rejuvenating yoga retreat.',
  },
  {
    id: 8,
    name: 'Gaming Championship 2025',
    date: new Date('2025-05-25'),
    image: 'assets/images/jazz.jpeg',
    location: 'E-Sports Arena, Las Vegas',
    categoryId: '6',
    description:
      'Watch top gamers compete in the ultimate gaming championship.',
  },
  {
    id: 9,
    name: 'Film Festival 2025',
    date: new Date('2025-10-20'),
    image: 'assets/images/jazz.jpeg',
    location: 'Hollywood Theatre, Los Angeles',
    categoryId: '2',
    description:
      'Experience the magic of cinema with screenings of critically acclaimed films.',
  },
  {
    id: 10,
    name: 'Marathon 2025',
    date: new Date('2025-02-15'),
    image: 'assets/images/jazz.jpeg',
    location: 'Central Park, New York',
    categoryId: '6',
    description:
      'Join thousands of runners in the annual marathon through the city.',
  },
];
