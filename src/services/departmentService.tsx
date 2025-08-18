import axiosClient from "../data/axios";
import { Department,DepartmentCreateDto } from "../types/Department";

const DEPARTMENT_URL = "/department";

export const getAllDeparment = async (): Promise<Department[]> => {
  return await axiosClient.get(`${DEPARTMENT_URL}/getall`);
};

export const getDeparmentById = async (id: number): Promise<Department> => {
    return await axiosClient.get(`${DEPARTMENT_URL}/${id}`);
}

export const createDeparment = async (dto: DepartmentCreateDto) : Promise<Department> =>{
    return await axiosClient.post(DEPARTMENT_URL, dto);
}

export const updatedepartment = async (id: number, department: Department): Promise<void> => {
  await axiosClient.put(`${DEPARTMENT_URL}/${id}`, department);
};