import axiosClient from "../data/axios";
import { Employee, EmployeeCreateDto } from "../types/Employee";

const EMPLOYEE_URL = "/employee";

export const getAllEmployees = async (): Promise<Employee[]> => {
  return await axiosClient.get(`${EMPLOYEE_URL}/getall`);
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  return await axiosClient.get(`${EMPLOYEE_URL}/${id}`);
};

export const createEmployee = async (dto: EmployeeCreateDto): Promise<Employee> => {
  return await axiosClient.post(EMPLOYEE_URL, dto);
};

export const updateEmployee = async (id: number, employee: Employee): Promise<void> => {
  await axiosClient.put(`${EMPLOYEE_URL}/${id}`, employee);
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await axiosClient.delete(`${EMPLOYEE_URL}/${id}`);
};
