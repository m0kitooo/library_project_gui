import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import DialogBox from "../../components/DialogBox.jsx";

export default function EventPlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [dialogMessage, setDialogMessage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/event-plans/${id}`);
        if (!response.ok) throw new Error("Błąd pobierania danych planu");

        const data = await response.json();
        setName(data.name);
        setDescription(data.description);
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlan();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/event-plans/modify`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, description }),
      });

      if (!response.ok) throw new Error("Błąd podczas zapisu planu");

      setDialogMessage("Plan został zapisany.");
    } catch (err) {
      setDialogMessage("Błąd zapisu: " + err.message);
    }
  };

  const handleSubmitForApproval = async () => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/event-plans/${id}/submit`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Błąd wysyłania planu do akceptacji");

      setDialogMessage("Plan został wysłany do akceptacji.");
    } catch (err) {
      setDialogMessage("Błąd wysyłania: " + err.message);
    }
  };

  if (dialogMessage) {
    return <DialogBox message={dialogMessage} returnLink="/eventPlans" />;
  }

  return (
    <>
      <h2>Szczegóły planu wydarzenia</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Nazwa planu</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Opis</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <p>Status: {status}</p>

        <button type="button" onClick={handleSave}>Zapisz zmiany</button>
        <button type="button" onClick={handleSubmitForApproval}>Wyślij do akceptacji</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
