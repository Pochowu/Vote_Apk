// src/api/admin/Api.ts

// URL de base de l'API
const API_URL = 'http://127.0.0.1:8000/api';

// Définit le type Admin
export interface Admin {
  id: number;
  email: string;
  password?: string;
  created_at: string;
  updated_at: string;
  //
}

// Définit le type NewAdmin pour la création d'un nouvel administrateur
export type NewAdmin = {
    email: string;
    password?: string;
};


export const login = async (credentials: { email: string, password?: string }) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(credentials), // Convertit les informations d'identification en JSON
    });// Envoie une requête POST à l'API pour se connecter
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    } // Vérifie si la réponse est correcte
    return response.json();
}; 

export const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Logout failed');
    }
    return response.json();
};

export const checkLogin = async () => {
    const response = await fetch(`${API_URL}/check-login`, {
        headers: {
            'Accept': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Failed to check login status');
    }
    return response.json();
}; // Vérifie le statut de connexion de l'utilisateur


export const getAdmins = async (): Promise<Admin[]> => {
    const response = await fetch(`${API_URL}/admins`, {
        headers: {
            'Accept': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch admins');
    }
    const data = await response.json();
    return data; 
}; // Récupère la liste des administrateurs


export const getAdmin = async (id: number): Promise<Admin> => {
    const response = await fetch(`${API_URL}/admins/${id}`, {
         headers: {
            'Accept': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch admin with id ${id}`);
    }
    return response.json();
}; // Récupère un administrateur spécifique



export const createAdmin = async (admin: NewAdmin) => {
    const response = await fetch(`${API_URL}/admins`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(admin),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create admin');
    }
    return response.json();
}; // Crée un nouvel administrateur


export const updateAdmin = async (id: number, admin: Partial<NewAdmin>) => {
    const response = await fetch(`${API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(admin),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update admin');
    }
    return response.json();
}; // Met à jour un administrateur existant

export const deleteAdmin = async (id: number) => {
    const response = await fetch(`${API_URL}/admins/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to delete admin with id ${id}`);
    }
    return response.json();
}; // Supprime un administrateur spécifique