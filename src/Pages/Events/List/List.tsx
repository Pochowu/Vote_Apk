import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { eventApi } from "../../../api/events/eventApi";
import type { Event } from "../../../data/models/event.model";
import "./List.css";

export default function EventList() {
   
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await eventApi.getAll();
            setEvents(data);
        } catch (error) {
            console.error(error);
            setError("Erreur lors du chargement des événements");
        } finally {
            setIsLoading(false);
        }
    };

    

    const handleDestroyEvent = async (id: number) => {
  if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
    return;
  }

  try {
    await eventApi.destroy(id);
    setEvents(events.filter(event => event.id !== id));
  } catch (err) {
    console.error(err);
    setError("Erreur lors de la suppression");
  }
};



    

    // ✅ Correction : formatDate prend une string
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <p>Chargement des événements...</p>
            </div>
        );
    }

    return (
        <div className="event-list-container">
            <div className="list-header">
                <h1>Liste des événements</h1>
            </div>

            {error && <div className="alert alert--error">{error}</div>}

            {events.length === 0 ? (
                <div className="empty-state">
                    <Link to="/events/create" className="btn btn--primary">
                        Ajouter un événement
                        <svg xmlns="http://www.w3.org/2000/svg" className="svg-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>
            ) : (
                <div className="event-grid">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <div className="event-card__header">
                                <h3>{event.title}</h3>
                                <span className={`status-badge status-badge--${event.status.toLowerCase()}`}>
                                    {event.status}
                                </span>
                            </div>
                            
                            <div className="event-card__body">
                                <p className="event-description">{event.description}</p>
                                
                                <div className="event-dates">
                                    <div className="date-item">
                                        <span className="date-label">Début:</span>
                                        <span className="date-value">{formatDate(event.start_date)}</span>
                                    </div>
                                    <div className="date-item">
                                        <span className="date-label">Fin:</span>
                                        <span className="date-value">{formatDate(event.end_date)}</span>
                                    </div>
                                </div>

                                <div className="event-vote">
                                    <span className="vote-label">Montant du vote:</span>
                                    <span className="vote-amount">{event.vote_amount}</span>
                                </div>
                            </div>

                            <div className="event-card__actions">
                                <button
                                    className="btn btn--ghost btn--sm"
                                    onClick={() => navigate(`/events/${event.id}`)}
                                >
                                    Voir
                                </button>
                                <button
                                    className="btn btn--ghost btn--sm"
                                    onClick={() => navigate(`/events/edit/${event.id}`)}
                                >
                                    Modifier
                                </button>
                                <button onClick={() => handleDestroyEvent(event.id)}>
                                    Supprimer
                                </button>

                            </div>
                        
                            <div className="empty-state">
                                <Link to="/events/create" className="btn btn--primary">
                                    Ajouter un événement
                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

