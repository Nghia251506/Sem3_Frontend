import axiosClient from "../data/axios";
import {User, UserCreateDto} from '../types/User'

const USER_URL = "/user";

export const getAllUsers = async () : Promise<User[]> => {
    return await axiosClient.get(`${USER_URL}/getall`);
};

export const getUserById = async (id: number): Promise<User[]> => {
    return await axiosClient.get(`${USER_URL}/${id}`);
};

export const createUser = async (dto: UserCreateDto): Promise<User> => {
    return await axiosClient.post(USER_URL, dto);
};

export const updateUser = async (id: number, user: User): Promise<void>=>{
    await axiosClient.put(`${USER_URL}/${id}`, user);
};

export const deleteUser = async (id: number):Promise<void> =>{
    await axiosClient.delete(`${USER_URL}/${id}`);
};