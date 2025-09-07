import axiosClient from "../data/axios";
import { ServiceRequest, ServiceRequestCreateDto } from "../types/ServiceRequest";

const SERVICE_REQUEST_URL = "/request";

export const getAllRequest = async (): Promise<ServiceRequest[]> => {
  return await axiosClient.get(`${SERVICE_REQUEST_URL}/getall`);
};

export const getRequestById = async (id: number): Promise<ServiceRequest> => {
  return await axiosClient.get(`${SERVICE_REQUEST_URL}/${id}`);
};



export const createRequest = async (dto: ServiceRequestCreateDto): Promise<ServiceRequest> => {
  return await axiosClient.post(SERVICE_REQUEST_URL, dto);
};

export const updateRequest = async (id: number, ServiceRequest: ServiceRequest): Promise<void> => {
  await axiosClient.put(`${SERVICE_REQUEST_URL}/${id}`, ServiceRequest);
};

export const deleteRequest = async (id: number): Promise<void> => {
  await axiosClient.delete(`${SERVICE_REQUEST_URL}/${id}`);
};