// src/api/events/Api.ts

const API_URL = 'http://127.0.0.1:8000/api';

export interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

export type NewEvent = Omit<Event, 'id'>;

export const getEvents = async (): Promise<Event[]> => {
    const response = await fetch(`${API_URL}/events`, {
        headers: {
            'Accept': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    const responseData = await response.json();
    // Handle cases where the data is wrapped in a 'data' property
    return responseData.data || responseData;
};

export const getEvent = async (id: number): Promise<Event> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
         headers: {
            'Accept': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch event with id ${id}`);
    }
    const responseData = await response.json();
    // Handle cases where the data is wrapped in a 'data' property
    return responseData.data || responseData;
};

export const createEvent = async (event: NewEvent) => {
    const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(event),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
    }
    return response.json();
};

export const updateEvent = async (id: number, event: Partial<NewEvent>) => {
    const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(event),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update event');
    }
    return response.json();
};

export const deleteEvent = async (id: number) => {
    const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to delete event with id ${id}`);
    }
    return response.json();
};
