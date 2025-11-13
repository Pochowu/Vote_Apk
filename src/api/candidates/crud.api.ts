import type { candidate } from "../../data/models/candidate.model";
import axiosInstance from "../axios_instance";


export const candidateApi = {
    getAll: async (): Promise<candidate[]> => {
        const response = await axiosInstance.get('/candidate');
        return response.data.data;
    },

    create: async (formData: FormData): Promise<candidate[]> => {
        const response = await axiosInstance.post('/candidate', formData);
        return response.data;
    },


    read: async (id: number): Promise<candidate> => {
        const response = await axiosInstance.get(`/candidate/${id}`);
        return response.data.data;
    },

    destroy: async (id: number): Promise<candidate[]> => {
        const response = await axiosInstance.delete(`/candidate/${id}`);
        return response.data;
    },

}