import { cliente } from './cliente';

export interface responseCliente {
  value: cliente[];
}

export interface responseAgregarCliente {
  message: string;
}
