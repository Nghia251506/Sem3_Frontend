import axiosClient from "../data/axios";
import { AboutUs, AboutUsCreateDto,AboutUsUpdateDto} from "../types/AboutUs";

const ABOUTUS_URL = "/aboutus";

export const getAllAboutUs = async (): Promise<AboutUs[]> => {
    return await axiosClient.get(`${ABOUTUS_URL}/getall`);
};

export const getAboutUsById = async (id: number): Promise<AboutUs> => {
    return await axiosClient.get(`${ABOUTUS_URL}/ ${id}`);
};

export const createAboutUs = async (dto: AboutUsCreateDto): Promise<AboutUs> => {
    return await axiosClient.post(ABOUTUS_URL, dto);
}

export const updateAboutUs = async (id: number, aboutus: AboutUsUpdateDto): Promise<void> => {
    return axiosClient.put(`${ABOUTUS_URL}/ ${id}`, aboutus);
}