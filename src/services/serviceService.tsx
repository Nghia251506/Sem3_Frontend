import axiosClient from "../data/axios";
import { Service, ServiceCreateDto } from "../types/Service";

const SERIVCE_URL = "/service";

export const getAllService = async (): Promise<Service[]> => {
  return await axiosClient.get(`${SERIVCE_URL}/getall`);
};

export const getServiceById = async (id: number): Promise<Service> => {
  return await axiosClient.get(`${SERIVCE_URL}/${id}`);
};

export const createService = async (dto: ServiceCreateDto): Promise<Service> => {
  return await axiosClient.post(SERIVCE_URL, dto);
};

export const updateService = async (id: number, serivce: Service): Promise<void> => {
  await axiosClient.put(`${SERIVCE_URL}/${id}`, serivce);
};

export const deleteService = async (id: number): Promise<void> => {
  await axiosClient.delete(`${SERIVCE_URL}/${id}`);
};
