import axiosClient from "../data/axios";
import { Service, ServiceCreateDto  } from "../types/Service";

const SERVICE_URL = "/service";

export const getAllService = async (): Promise<Service[]>=> {
    return await axiosClient.get(`${SERVICE_URL}/getall`);
};

export const createService = async (dto: ServiceCreateDto): Promise<Service> => {
    return await axiosClient.post(SERVICE_URL, dto);
};