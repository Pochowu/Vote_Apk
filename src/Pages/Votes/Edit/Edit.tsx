// Votes/Edit/Edit.tsx

import React, { useState, useEffect } from 'react';
import { getVoteById, updateVote, type Vote } from '../../../api/votes/Api';


// Type pour les champs que l'on autorise à modifier
interface EditFormData {
    voting_name: string;
    phone_number: string;
}

interface EditVoteProps {
    voteId: string | number; 
}

const EditVote: React.FC<EditVoteProps> = ({ voteId }) => {
    const [vote, setVote] = useState<Vote | null>(null);
    const [formData, setFormData] = useState<EditFormData>({ voting_name: '', phone_number: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<any>(null);

    // 1. Charger les données initiales du vote
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const result = await getVoteById(voteId);
                if (result.status === 'success' && result.vote) {
                    setVote(result.vote);
                    setFormData({
                        voting_name: result.vote.voting_name,
                        phone_number: result.vote.phone_number,
                    });
                } else {
                    setError('Vote introuvable.');
                }
            } catch (err) {
                setError('Impossible de charger les données du vote.');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [voteId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        setValidationErrors(null);

        try {
            const result = await updateVote(voteId, formData);

            if (result.status === 'success') {
                setSuccess(result.message || 'Vote mis à jour avec succès !');
            } else {
                setError(result.message || "Erreur lors de la mise à jour.");
                setValidationErrors(result.errors);
            }
        } catch (err) {
            setError("Impossible de contacter le serveur.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Chargement du formulaire d'édition...</p>;
    if (error && !vote) return <p className="error-message">Erreur : {error}</p>;
    if (!vote) return <p>Vote non chargé.</p>;

    return (
        <div className="edit-vote-container">
            <h2>Modification du Vote #{voteId}</h2>
            <p>Candidat : **{vote.candidate.name}** | Montant initial : **{vote.amount}** | Nombre de votes : **{vote.votes_number}**</p>
            
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Champ Nom du votant */}
                <label>Nom du votant</label>
                <input type="text" name="voting_name" value={formData.voting_name} onChange={handleChange} required />
                {validationErrors?.voting_name && <p className="error">{validationErrors.voting_name}</p>}
                
                {/* Champ Numéro de téléphone */}
                <label>Numéro de téléphone</label>
                <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                {validationErrors?.phone_number && <p className="error">{validationErrors.phone_number}</p>}

                <p style={{ marginTop: '20px', fontStyle: 'italic' }}>* Les champs relatifs au montant et au nombre de votes ne sont pas modifiables pour des raisons de sécurité de la transaction.</p>

                <button type="submit" disabled={loading}>
                    {loading ? 'Sauvegarde...' : 'Enregistrer les modifications'}
                </button>
            </form>
        </div>
    );
};

export default EditVote;