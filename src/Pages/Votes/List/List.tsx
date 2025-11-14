// Votes/List/List.tsx

import React, { useState, useEffect } from 'react';
import { deleteVote, getVotesList, type Vote } from '../../../api/votes/Api';


const VotesList: React.FC = () => {
    const [votes, setVotes] = useState<Vote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

    const fetchVotes = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getVotesList();
            if (result.status === 'success' && result.votes) {
                setVotes(result.votes);
            } else {
                setError('Erreur lors de la récupération des votes.');
            }
        } catch (err) {
            setError('Impossible de contacter le serveur.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVotes();
    }, []);

    const handleDelete = async (voteId: number) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le vote #${voteId} ?`)) {
            return;
        }

        setDeleteStatus(`Suppression du vote #${voteId}...`);
        try {
            await deleteVote(voteId);
            setDeleteStatus(`✅ Vote #${voteId} supprimé avec succès.`);
            // Mettre à jour la liste sans recharger complètement
            setVotes(votes.filter(vote => vote.id !== voteId));
        } catch (err: any) {
            setDeleteStatus(`❌ Échec de la suppression : ${err.message}`);
        }
    };

    if (loading) return <p>Chargement des votes...</p>;
    if (error) return <p className="error-message">Erreur : {error}</p>;

    return (
        <div className="votes-list-container">
            <h1>Liste de Tous les Votes ({votes.length})</h1>
            {deleteStatus && <p>{deleteStatus}</p>}
            
            {votes.length === 0 ? (
                <p>Aucun vote enregistré.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Candidat</th>
                            <th># Votes</th>
                            <th>Montant</th>
                            <th>Méthode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.map((vote) => (
                            <tr key={vote.id}>
                                <td>{vote.id}</td>
                                <td>{vote.candidate.name}</td>
                                <td>{vote.votes_number}</td>
                                <td>{vote.amount}</td>
                                <td>{vote.payment_method}</td>
                                <td>
                                    {/* Lien ou bouton vers la page Show */}
                                    <button onClick={() => {/* Navigation vers /votes/${vote.id} */}}>Voir</button> 
                                    {/* Lien ou bouton vers la page Edit */}
                                    <button onClick={() => {/* Navigation vers /votes/${vote.id}/edit */}}>Éditer</button>
                                    <button onClick={() => handleDelete(vote.id)} style={{ color: 'red' }}>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VotesList;