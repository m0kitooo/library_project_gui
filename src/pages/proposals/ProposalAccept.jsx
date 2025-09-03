import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx";
import ROUTES from "../../routes.jsx";

export default function ProposalAccept() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [proposal, setProposal] = useState(null);
    const [organizers, setOrganizers] = useState([]);
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);
    const [selectedType, setSelectedType] = useState('');
    const [error, setError] = useState(null);

    const planTypes = [
        { value: "INNER", label: "Wewnętrzny" },
        { value: "TRAINING", label: "Szkolenie" }
    ];

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await fetch(`http://localhost:8080/proposal/details?proposalId=${id}`, {
                    method: "POST",
                    credentials: "include"
                });
                if (!response.ok) throw new Error("Błąd pobierania szczegółów propozycji");
                const data = await response.json();
                setProposal(data);
                setSelectedType(data.type || '');
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProposal();
    }, [id]);

    useEffect(() => {
        const fetchOrganizers = async () => {
            try {
                const response = await axios.post("http://localhost:8080/users/list", {
                    page: 0, limit: 20, filterFullname: ""
                }, { withCredentials: true });
                setOrganizers(response.data);
            } catch {
                setError("Błąd pobierania organizatorów");
            }
        };
        fetchOrganizers();
    }, []);

    const handleChange = (e) => {
        setProposal({ ...proposal, [e.target.name]: e.target.value });
    };

    const handleModify = async () => {
        if (!proposal.id || !proposal.title) {
            alert("ID i tytuł nie mogą być puste");
            return;
        }

        const payload = { id: proposal.id, title: proposal.title, description: proposal.description };
        try {
            const response = await fetch("http://localhost:8080/proposal/modify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: 'include'
            });
            if (!response.ok) throw new Error("Błąd zapisu");
            alert("Zmiany zapisane");
            navigate(ROUTES.proposal.path);
        } catch (err) {
            alert("Nie udało się zapisać zmian: " + err.message);
        }
    };

    const handleAccept = async () => {
        if (!selectedOrganizer) {
            alert("Wybierz organizatora");
            return;
        }
        if (!selectedType) {
            alert("Wybierz typ planu");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/proposal/accept?proposalId=${Number(id)}&organizerId=${Number(selectedOrganizer)}&type=${selectedType}`,
                { method: "POST", credentials: 'include' }
            );

            if (!response.ok) throw new Error("Błąd akceptacji propozycji");

            const data = await response.json();
            alert(`Propozycja zaakceptowana! Utworzono EventPlan ID: ${data.eventPlanId}`);
            navigate(ROUTES.proposal.path);
        } catch (err) {
            alert("Nie udało się zaakceptować propozycji: " + err.message);
        }
    };

    if (error) return <BasePageLayout><p>{error}</p></BasePageLayout>;
    if (!proposal) return <BasePageLayout><p>Ładowanie...</p></BasePageLayout>;

    return (
        <BasePageLayout>
            <h2>Akceptacja propozycji</h2>
            <form style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "500px" }}>
                <label>
                    Tytuł:
                    <input type="text" name="title" value={proposal.title || ""} onChange={handleChange} />
                </label>
                <label>
                    Opis:
                    <textarea name="description" value={proposal.description || ""} onChange={handleChange} />
                </label>
                <label>
                    Status:
                    <input type="text" name="status" value={proposal.status || ""} readOnly />
                </label>
                <label>
                    Proponowane przez:
                    <input type="text" value={proposal.proposedBy || ""} readOnly />
                </label>

                <label>
                    Organizator:
                    <select onChange={(e) => setSelectedOrganizer(e.target.value)} value={selectedOrganizer || ""}>
                        <option value="">-- wybierz --</option>
                        {organizers.map((o) => <option key={o.id} value={o.id}>{o.username}</option>)}
                    </select>
                </label>

                <label>
                    Typ planu:
                    <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
                        <option value="">-- wybierz typ --</option>
                        {planTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                </label>

                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                    <button type="button" onClick={handleModify}>Zapisz zmiany</button>
                    <button type="button" onClick={handleAccept}>Akceptuj</button>
                    <button type="button" onClick={() => navigate(-1)}>Anuluj</button>
                </div>
            </form>
        </BasePageLayout>
    );
}
