import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import ROUTES from "../../routes.jsx";

function ReturnWithCommentsPage() {
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${CORE_API_BASE_URL}/proposal/return-with-comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: Number(id),
                    comment: comment,
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Błąd podczas odsyłania propozycji");
            }

            alert("Propozycja została odesłana z uwagami.");
            navigate(`${ROUTES.proposal.path}`);
        } catch (err) {
            console.error(err);
            alert("Nie udało się odesłać propozycji.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Odeślij propozycję z uwagami</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Uwagi:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        rows={5}
                        cols={40}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Wysyłanie..." : "Wyślij"}
                </button>
            </form>
        </div>
    );
}

export default ReturnWithCommentsPage;
