
export interface Service{
    id: number;
    code: string;
    name: string;
    division: string;
    description: string;
    // servicesPackages: [];
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