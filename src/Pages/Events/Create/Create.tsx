import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { eventApi } from "../../../api/events/eventApi";
import { EVENT_STATUS_OPTIONS, type CreateEventDto, type EventStatus,  } from "../../../data/models/event.model";
import "./Create.css";

export default function EventCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateEventDto>({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        vote_amount: "",
        status: "en_cours", // valeur par défaut conforme à la DB
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            status: e.target.value as EventStatus,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await eventApi.create(formData);
            if (response.success) {
                navigate("/events");
            } else {
                setError(response.message || "Erreur lors de la création de l'événement");
            }
        } catch (err: any) {
            console.error("Erreur API:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Erreur lors de la création de l'événement");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="event-create-container">
            <div className="create-header">
                <h1>Créer un événement</h1>
            </div>

            {error && <div className="alert alert--error">{error}</div>}

            <form className="event-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="start_date">Date de début</label>
                    <input
                        type="datetime-local"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="end_date">Date de fin</label>
                    <input
                        type="datetime-local"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="vote_amount">Montant du vote</label>
                    <input
                        type="text"
                        id="vote_amount"
                        name="vote_amount"
                        value={formData.vote_amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Statut</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleStatusChange}
                    >
                        {EVENT_STATUS_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                        {isSubmitting ? "Création en cours..." : "Créer"}
                    </button>
                    <Link to="/events" className="btn btn--ghost">
                        Annuler
                    </Link>
                </div>
            </form>
        </div>
    );
}
