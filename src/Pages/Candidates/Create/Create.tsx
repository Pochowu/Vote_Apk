import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import candidateApi from "../api/candidateApi";
import eventApi from "../api/eventApi";
import Input from "../components/Input";

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [event_id, setEventId] = useState("");
  const [events, setEvents] = useState<any[]>([]);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    photo: "",
    event_id: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getAll();
        setEvents(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des événements", error);
      }
    };
    fetchEvents();
  }, []);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrors({ ...errors, name: "" });
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    setErrors({ ...errors, description: "" });
  };

  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, photo: "Format non supporté. Utilisez JPG, PNG ou WEBP" });
        return;
      }

      if (file.size > maxSize) {
        setErrors({ ...errors, photo: "Le fichier est trop volumineux (max 5MB)" });
        return;
      }

      setPhoto(file);
      setErrors({ ...errors, photo: "" });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const goToBack = () => navigate(-1);

  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      description: "",
      photo: "",
      event_id: "",
    };

    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Le nom est requis";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "La description est requise";
      isValid = false;
    }

    if (!event_id) {
      newErrors.event_id = "Veuillez sélectionner un événement";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) {
      setErrorMessage("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("event_id", event_id);

      // Correspond exactement à ce que la plupart des APIs attendent
      if (photo) formData.append("photo", photo);

      await candidateApi.create(formData);

      setSuccessMessage("Candidat(e) créé(e) avec succès !");

      setTimeout(() => {
        resetForm();
        navigate("/candidates");
      }, 2000);
    } catch (error: any) {
      console.error("Error creating candidate:", error);

    //   if (error.response?.status === 422 && error.response?.data?.errors) {
    //     const serverErrors = error.response.data.errors;
    //     const newErrors = { ...errors };

    //     Object.keys(serverErrors).forEach((key) => {
    //       if (newErrors.hasOwnProperty(key)) {
    //         newErrors[key] = serverErrors[key][0];
    //       }
    //     });

    //     setErrors(newErrors);
    //     setErrorMessage("Veuillez corriger les erreurs");
    //   } else {
    //     setErrorMessage(
    //       error.response?.data?.message ||
    //         error.message ||
    //         "Erreur lors de la création du candidat"
    //     );
    //   }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setEventId("");
    setPhoto(null);
    setPicturePreview("");
    setErrors({ name: "", description: "", photo: "", event_id: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button
        type="button"
        onClick={goToBack}
        style={{
          padding: "8px 16px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Retour
      </button>

      <h1 style={{ color: "#070ffaff" }}>Créer un(e) candidat(e)</h1>

      {successMessage && (
        <div style={{ backgroundColor: "#d4edda", padding: "12px", borderRadius: "5px", marginTop: "15px" }}>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div style={{ backgroundColor: "#f8d7da", padding: "12px", borderRadius: "5px", marginTop: "15px" }}>
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <Input
              label="Nom *"
              type="text"
              placeholder="Entrez le nom..."
              onChange={onNameChange}
              value={name}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div>
            <Input
              label="Description courte *"
              type="text"
              placeholder="Brève description..."
              onChange={onDescriptionChange}
              value={description}
            />
            {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="event_id">Événement *</label>
            <select
              id="event_id"
              value={event_id}
              onChange={(e) => {
                setEventId(e.target.value);
                setErrors({ ...errors, event_id: "" });
              }}
              style={{
                display: "block",
                marginTop: "5px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              <option value="">-- Sélectionner un événement --</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
            {errors.event_id && <p style={{ color: "red" }}>{errors.event_id}</p>}
          </div>

          <div>
            <label>Photo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={onPhotoChange}
            />
            {errors.photo && <p style={{ color: "red" }}>{errors.photo}</p>}

            {picturePreview && (
              <img
                src={picturePreview}
                alt="Preview"
                style={{ marginTop: "10px", width: "150px", borderRadius: "8px" }}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "12px",
              backgroundColor: "#070ffaff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {isLoading ? "Création..." : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}
