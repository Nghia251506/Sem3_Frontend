export interface ServiceRequest {
  id: number;
  serviceId: number;
  clientName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  requestDetail: string
}

export interface ServiceRequestCreateDto{
    serviceId: number;
    clientName: string;
    contactPhone: string;
    contactEmail: string;
    address: string;
    requestDetail: string
}