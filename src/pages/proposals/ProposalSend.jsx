import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx";
import ROUTES from "../../routes.jsx";

export default function ProposalSend() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [proposedBy, setProposedBy] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    const planTypes = [
        { value: "INNER", label: "Wewnętrzny" },
        { value: "TRAINING", label: "Szkolenie" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!type) {
            alert("Musisz wybrać typ planu");
            return;
        }

        const payload = { title, description, proposedBy, type };

        try {
            const response = await fetch('http://localhost:8080/proposal/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            if (response.ok) {
                alert("Propozycja została wysłana pomyślnie!");
            } else {
                alert(`Błąd podczas wysyłania propozycji. ${response.statusText}`);
            }
        } catch (error) {
            alert('Błąd połączenia z serwerem: ' + error);
        }
        navigate(ROUTES.proposal.path);
    };

    return (
        <BasePageLayout>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "500px" }}>
                <input type="text" placeholder="*Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Opis" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Autor pomysłu" value={proposedBy} onChange={(e) => setProposedBy(e.target.value)} />

                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="">-- wybierz typ planu --</option>
                    {planTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </select>

                <button type="submit">Wyślij propozycję</button>
            </form>
        </BasePageLayout>
    );
}
