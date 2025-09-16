export interface ServicePackage {
  id: number;
  serviceId: number;
  packageName: string;
  staffRange: string;
  price: number;
  note?: string;
}

export interface ServicePackageCreateDto{
    serviceId: number;
    packageName: string;
    staffRange: string;
    price: number;
    note?: string;
}