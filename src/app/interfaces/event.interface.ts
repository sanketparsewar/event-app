export interface Ievent {
  id: number;
  name: string;
  date: Date;
  image: string;
  location: string;
  headliners?: string[];
  performers?: string[];
  categoryId: string;
  description: string;
}
