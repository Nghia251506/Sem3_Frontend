
export interface Service{
    id: number;
    code: string;
    name: string;
    division: string;
    description: string;
}

export interface ServiceCreateDto{
    code: string;
    name: string;
    division: string;
    description: string;
}