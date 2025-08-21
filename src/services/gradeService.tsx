import axiosClient from "../data/axios";
import { Grade } from "../types/Grade";

const GRADE_URL = "/grade";

export const getAllGrade = async (): Promise<Grade[]> => {
    return await axiosClient.get(`${GRADE_URL}/getall`);
}