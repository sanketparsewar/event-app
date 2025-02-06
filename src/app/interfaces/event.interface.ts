export interface Ievent {
  _id: string;
  name: string;
  date: Date;
  image: string;
  location: {
    venue: string;
    city: string;
  };
  headliners?: string[];
  performers?: string[];
  categoryId: string;
  description: string;
  shows:any[],
    bookings:any[],
}
