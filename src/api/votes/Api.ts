// votes/Api.ts

import axios from 'axios';

// --- TYPES DE DONNÉES ---

// Données requises pour la création/modification d'un vote
interface VoteData {
    amount: number;
    voting_name: string;
    votes_number: number;
    payment_method: 'mix_by_yas' | 'flooz';
    phone_number: string;
}

// Structure d'un vote retourné par le backend
export interface Vote {
    id: number;
    amount: number;
    voting_name: string;
    votes_number: number;
    payment_method: string;
    phone_number: string;
    candidate: { id: number; name: string };
    event: { id: number; name: string; vote_amount: number };
    created_at: string;
}

// Structure générique de réponse de l'API
interface ApiResponse {
    status: 'success' | 'error';
    message: string;
    vote?: Vote | null; // Pour les réponses singulières
    votes?: Vote[]; // Pour les réponses de liste
    errors?: any; // Pour les erreurs de validation 422
}


// --- CONFIGURATION ---

// L'URL de base de votre API Laravel
const API_URL = '/api';


// --- FONCTIONS CRUD ---

/**
 * [C] Enregistre un nouveau vote pour un candidat donné.
 * Endpoint: POST /api/candidates/{candidatId}/votes
 */
export const createVote = async (
    candidateId: string | number,
    data: VoteData
): Promise<ApiResponse> => {
    try {
        const response = await axios.post(
            `${API_URL}/candidates/${candidateId}/votes`,
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: 'error',
                message: error.response.data.message || 'Une erreur de validation est survenue.',
                errors: error.response.data.errors,
            };
        }
        return { status: 'error', message: 'Erreur réseau ou du serveur.' };
    }
};

/**
 * [R] Récupère la liste de tous les votes (ADMIN).
 * Endpoint: GET /api/votes
 */
export const getVotesList = async (): Promise<ApiResponse> => {
    try {
        const response = await axios.get(`${API_URL}/votes`);
        return response.data;
    } catch (error) {
        throw new Error('Erreur lors de la récupération de la liste des votes.');
    }
};

/**
 * [R] Récupère un vote par son ID (ADMIN).
 * Endpoint: GET /api/votes/{voteId} (Route à définir dans Laravel)
 */
export const getVoteById = async (voteId: string | number): Promise<ApiResponse> => {
    try {
        const response = await axios.get(`${API_URL}/votes/${voteId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du vote ${voteId}.`);
    }
};

/**
 * [U] Met à jour un vote existant par son ID (ADMIN).
 * Endpoint: PUT /api/votes/{voteId} (Route à définir dans Laravel)
 */
export const updateVote = async (
    voteId: string | number,
    data: Partial<VoteData>
): Promise<ApiResponse> => {
    try {
        const response = await axios.put(
            `${API_URL}/votes/${voteId}`,
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: 'error',
                message: error.response.data.message || 'Erreur de validation lors de la modification.',
                errors: error.response.data.errors,
            };
        }
        return { status: 'error', message: 'Erreur réseau ou du serveur.' };
    }
};

/**
 * [D] Supprime un vote existant par son ID (ADMIN).
 * Endpoint: DELETE /api/votes/{voteId} (Route à définir dans Laravel)
 */
export const deleteVote = async (voteId: string | number): Promise<ApiResponse> => {
    try {
        const response = await axios.delete(`${API_URL}/votes/${voteId}`);
        return response.data; // Devrait retourner un message de succès
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du vote ${voteId}.`);
    }
};