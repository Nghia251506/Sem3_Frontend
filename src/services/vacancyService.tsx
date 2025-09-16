import axiosClient from "../data/axios";
import { Vacancy, VacancyCreateDto } from "../types/Vacancy";

const VACANCY_URL = "/vacancy";

export const getAllVacancy = async (): Promise<Vacancy[]> => {
  return await axiosClient.get(`${VACANCY_URL}/getall`);
};

export const getVacancyById = async (id: number): Promise<Vacancy> => {
  return await axiosClient.get(`${VACANCY_URL}/${id}`);
};

export const createVacancy = async (dto: VacancyCreateDto): Promise<Vacancy> => {
  return await axiosClient.post(VACANCY_URL, dto);
};

export const updateVacancy = async (id: number, vacancy: Vacancy): Promise<void> => {
  await axiosClient.put(`${VACANCY_URL}/${id}`, vacancy);
};

export const deleteVacancy = async (id: number): Promise<void> => {
  await axiosClient.delete(`${VACANCY_URL}/${id}`);
};
