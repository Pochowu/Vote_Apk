import type { Event, CreateEventDto } from "../../data/models/event.model";
import type { UpdateEventDto } from "../../data/models/event.model";
import axiosInstance from "../axios_instances";

export const eventApi = {
    // 📌 Récupérer tous les événements
    getAll: async (): Promise<Event[]> => {
        const response = await axiosInstance.get('/events');
        return response.data.data;
    },

    // 📌 Créer un événement
    create: async (data: CreateEventDto): Promise<{ success: boolean; data: Event; message: string }> => {
        const response = await axiosInstance.post('/events', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    },

    // 📌 Lire un événement par ID
    read: async (id: number): Promise<Event> => {
        const response = await axiosInstance.get(`/events/${id}`);
        return response.data.data;
    },

    // 📌 Mettre à jour un événement
    update: async (id: number, data: UpdateEventDto): Promise<{ success: boolean; data: Event; message: string }> => {
        const response = await axiosInstance.put(`/events/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    },

    // 📌 Supprimer un événement
    destroy: async (id: number): Promise<Event[]> => {
        const response = await axiosInstance.delete(`/events/${id}`);
        return response.data;
    },
};
