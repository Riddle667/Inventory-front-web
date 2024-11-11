import { Category, Client } from ".";

export interface User {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  image?: string;
  password?: string;
  category?: Category[];
  client?: Client[];
  createdAt?: string;
  updatedAt?: string;
  session_token?: string;
}
