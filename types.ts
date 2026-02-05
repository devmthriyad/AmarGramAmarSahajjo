export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  progress: number;
  target: number;
  raised: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
}

export enum PaymentMethod {
  BKASH = 'bKash',
  NAGAD = 'Nagad',
  ROCKET = 'Rocket'
}