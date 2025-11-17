
import React from 'react'

export default function Edit() {
  return (
    <div>Edit</div>
  )
}


// import { useState, useEffect } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { eventApi } from "../../../api/events/eventApi";
// import { EVENT_STATUS_OPTIONS, type EventStatus, type UpdateEventDto,  } from "../../../data/models/event.model";
// import "./Edit.css";

// export default function EventEdit() {
//     const navigate = useNavigate();
//     const { id } = useParams<{ id: string }>();
//     const [formData, setFormData] = useState<UpdateEventDto>({
//         id: Number(id),
//         title: "",
//         description: "",
//         start_date: "",
//         end_date: "",
//         vote_amount: "",
//         status: "en_cours",
//     });
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState<string>("");

//     // Charger l'événement existant
//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const event: Event = await eventApi.read(Number(id));
//                 setFormData({
//                     id: event.id,
//                     title: event.title,
//                     description: event.description || "",
//                     start_date: event.start_date,
//                     end_date: event.end_date,
//                     vote_amount: event.vote_amount,
//                     status: event.status as EventStatus,
//                 });
//             } catch (err: any) {
//                 console.error("Erreur API:", err.response?.data || err.message);
//                 setError("Impossible de charger l'événement");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchEvent();
//     }, [id]);

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//     ) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setFormData(prev => ({
//             ...prev,
//             status: e.target.value as EventStatus,
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setError("");

//         try {
//             const response = await eventApi.update(Number(id), formData);
//             if (response.success) {
//                 navigate("/events");
//             } else {
//                 setError(response.message || "Erreur lors de la mise à jour de l'événement");
//             }
//         } catch (err: any) {
//             console.error("Erreur API:", err.response?.data || err.message);
//             setError(err.response?.data?.message || "Erreur lors de la mise à jour de l'événement");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (isLoading) {
//         return <p>Chargement de l'événement...</p>;
//     }

//     return (
//         <div className="event-edit-container">
//             <div className="edit-header">
//                 <h1>Modifier l'événement</h1>
//             </div>

//             {error && <div className="alert alert--error">{error}</div>}

//             <form className="event-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="title">Titre</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="description">Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="start_date">Date de début</label>
//                     <input
//                         type="datetime-local"
//                         id="start_date"
//                         name="start_date"
//                         value={formData.start_date}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="end_date">Date de fin</label>
//                     <input
//                         type="datetime-local"
//                         id="end_date"
//                         name="end_date"
//                         value={formData.end_date}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="vote_amount">Montant du vote</label>
//                     <input
//                         type="text"
//                         id="vote_amount"
//                         name="vote_amount"
//                         value={formData.vote_amount}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="status">Statut</label>
//                     <select
//                         id="status"
//                         name="status"
//                         value={formData.status}
//                         onChange={handleStatusChange}
//                     >
//                         {EVENT_STATUS_OPTIONS.map(option => (
//                             <option key={option.value} value={option.value}>
//                                 {option.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="form-actions">
//                     <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
//                         {isSubmitting ? "Mise à jour en cours..." : "Mettre à jour"}
//                     </button>
//                     <Link to="/events" className="btn btn--ghost">
//                         Annuler
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// }
