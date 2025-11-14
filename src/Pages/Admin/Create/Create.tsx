import React, { useState } from 'react'; // importation React et useState
import { createAdmin } from '../../../api/admin/Api'; // importation de la fonction createAdmin
import type { NewAdmin } from '../../../api/admin/Api'; // importation du type NewAdmin


const Create: React.FC = () => {
    const [admin, setAdmin] = useState<NewAdmin>({ email: '', password: '' }); // permet de gérer l'état de l'administrateur à créer
    const [error, setError] = useState<string | null>(null); // permet de gérer les erreurs
    const [success, setSuccess] = useState<string | null>(null); // permet de gérer les messages de succès

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    }; // met à jour l'état de l'administrateur lors de la saisie dans le formulaire

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!admin.email || !admin.password) {
            setError('Email and password are required.');
            return ;
        } // Vérifie que l'email et le mot de passe sont fournis

        try {
            const result = await createAdmin(admin); // appelle la fonction createAdmin pour créer un nouvel administrateur
            setSuccess(result.message || 'Admin created successfully!'); // affiche un message de succès
            setAdmin({ email: '', password: '' }); // Réinitialise le formulaire
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    }; // gère la soumission du formulaire

    return (
        <div>
            <h2>Create New Admin</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={admin.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={admin.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Admin</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Create;
