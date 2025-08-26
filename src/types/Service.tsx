
export interface Service{
    id: number;
    code: string;
    name: string;
    division: string;
    description: string;
    // servicesPackages: [];
}

export interface ServicePackage {
  id: number;
  packageName: string;
  staffRange: string;
  price: number;
  note?: string;
}

export interface ServiceCreateDto{
    code: string;
    name: string;
    division: string;
    description: string;
}

export interface ServiceDetail extends Service {
  packages: [];
}