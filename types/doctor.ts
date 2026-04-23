export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  fee: number;
  experience?: number;
  rating?: number;
  available?: boolean;
}
