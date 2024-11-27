export interface cliente {
  id: number;
  nro_doc: string;
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
  estado: number;
}

export interface agregarCliente {
  nro_doc: string;
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
}
