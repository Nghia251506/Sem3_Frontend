export interface ServiceRequest {
  id: number;
  serviceId: number;
  assignedEmployeeId: number;
  clientName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  startDate: Date,
  endDate: Date,
  requestDetails: string
}

export interface ServiceRequestCreateDto{
    serviceId: number;
    assignedEmployeeId:number;
    clientName: string;
    contactPhone: string;
    contactEmail: string;
    address: string;
    requestDetail: string
}