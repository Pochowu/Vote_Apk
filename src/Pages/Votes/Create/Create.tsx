// Votes/Create/Create.tsx

import React, { useState } from 'react';
import { createVote } from '../../../api/votes/Api';


// Type pour le candidat (doit inclure l'info sur le montant du vote)
type Candidate = { id: number; name: string; event: { vote_amount: number } }; 

interface CreateVoteProps {
    candidate: Candidate; // Le candidat est supposé être passé via props
}

const CreateVote: React.FC<CreateVoteProps> = ({ candidate }) => {
    const voteUnitPrice = candidate.event.vote_amount;
    
    const [formData, setFormData] = useState({
        votes_number: 1,
        voting_name: '',
        payment_method: 'mix_by_yas', // Valeur par défaut
        phone_number: '',
        amount: voteUnitPrice, // Montant initial
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>(null);

    // Gère les changements de formulaire, y compris le calcul de 'amount'
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        let newFormData = { ...formData, [name]: value };

        if (name === 'votes_number') {
            const votesCount = parseInt(value) || 0;
            // Assure que le calcul correspond à la validation du backend
            newFormData = {
                ...newFormData,
                votes_number: votesCount,
                amount: votesCount * voteUnitPrice,
            };
        }

        setFormData(newFormData as any);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage(null);
        setErrors(null);

        try {
            const result = await createVote(candidate.id, formData as any);

            if (result.status === 'success') {
                setResponseMessage(`✅ ${result.message}`);
                // Réinitialiser le formulaire après succès (facultatif)
                // setFormData({ ...formData, votes_number: 1, voting_name: '', phone_number: '', amount: voteUnitPrice });
            } else {
                setResponseMessage(`❌ ${result.message}`);
                setErrors(result.errors); // Afficher les erreurs de validation
            }
        } catch (err) {
            setResponseMessage('❌ Erreur de connexion au serveur.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vote-form-container">
            <h2>Voter pour {candidate.name} (Prix unitaire: {voteUnitPrice})</h2>
            
            {responseMessage && <p style={{ color: responseMessage.startsWith('✅') ? 'green' : 'red' }}>{responseMessage}</p>}

            <form onSubmit={handleSubmit}>
                
                <label>Nom du votant</label>
                <input type="text" name="voting_name" value={formData.voting_name} onChange={handleChange} required />
                {errors?.voting_name && <p className="error">{errors.voting_name}</p>}
                
                <label>Nombre de votes (Min: 1)</label>
                <input type="number" name="votes_number" min="1" value={formData.votes_number} onChange={handleChange} required />
                {errors?.votes_number && <p className="error">{errors.votes_number}</p>}

                <label>Montant Total à Payer</label>
                <input type="number" name="amount" value={formData.amount} readOnly style={{ fontWeight: 'bold' }}/>
                {errors?.amount && <p className="error">{errors.amount}</p>}

                <label>Méthode de paiement</label>
                <select name="payment_method" value={formData.payment_method} onChange={handleChange} required >
                    <option value="mix_by_yas">Mix by Yas</option>
                    <option value="flooz">Flooz</option>
                </select>
                {errors?.payment_method && <p className="error">{errors.payment_method}</p>}

                <label>Numéro de téléphone</label>
                <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                {errors?.phone_number && <p className="error">{errors.phone_number}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Enregistrement...' : `Confirmer le Vote`}
                </button>
            </form>
        </div>
    );
};

export default CreateVote;