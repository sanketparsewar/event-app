export interface Ievent {
  _id: number;
  name: string;
  date: Date;
  image: string;
  location: string;
  headliners?: string[];
  performers?: string[];
  categoryId: string;
  description: string;
  shows:any[],
    bookings:any[],
}
