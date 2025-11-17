export const EVENT_STATUS_OPTIONS = [
    { value: 'en_cours', label: 'En cours' },
    { value: 'reporte', label: 'Reporté' },
    { value: 'termine', label: 'Terminé' },
    { value: 'annule', label: 'Annulé' },
] as const;

export type EventStatus = typeof EVENT_STATUS_OPTIONS[number]['value'];

export interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    vote_amount: string;
    status: EventStatus;
    created_at?: string;
    updated_at?: string;
}

export interface CreateEventDto {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    vote_amount: string;
    status: EventStatus;
}

export interface UpdateEventDto extends Partial<CreateEventDto> {
    id: number;
}