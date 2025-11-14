// Votes/Show/Show.tsx

import React, { useState, useEffect } from 'react';
import { getVoteById, type Vote } from '../../../api/votes/Api';


interface ShowVoteProps {
    voteId: string | number; 
}

const ShowVote: React.FC<ShowVoteProps> = ({ voteId }) => {
    const [vote, setVote] = useState<Vote | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVote = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getVoteById(voteId);
                if (result.status === 'success' && result.vote) {
                    setVote(result.vote);
                } else {
                    setError('Vote introuvable ou erreur de l\'API.');
                }
            } catch (err) {
                setError('Impossible de contacter le serveur.');
            } finally {
                setLoading(false);
            }
        };

        fetchVote();
    }, [voteId]);

    if (loading) return <p>Chargement des détails du vote...</p>;
    if (error) return <p className="error-message">Erreur : {error}</p>;
    if (!vote) return <p>Ce vote n'existe pas ou n'a pas pu être chargé.</p>;

    return (
        <div className="vote-details-container">
            <h2>Détails du Vote #{vote.id}</h2>
            
            <p><strong>Événement :</strong> {vote.event.name}</p>
            <p><strong>Candidat :</strong> {vote.candidate.name}</p>
            <hr />
            <p><strong>Votant :</strong> {vote.voting_name}</p>
            <p><strong>Numéro de Téléphone :</strong> {vote.phone_number}</p>
            <hr />
            <p><strong>Nombre de Votes :</strong> {vote.votes_number}</p>
            <p><strong>Montant Payé :</strong> {vote.amount}</p>
            <p><strong>Méthode de Paiement :</strong> {vote.payment_method}</p>
            <p><strong>Date d'Enregistrement :</strong> {new Date(vote.created_at).toLocaleString()}</p>
        </div>
    );
};

export default ShowVote;