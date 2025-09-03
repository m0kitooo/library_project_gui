import { useEffect, useState } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import BasePageLayout from '../../components/BasePageLayout/BasePageLayout.jsx';
import ROUTES from "../../routes.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import BackButton from "../../components/BackButton/BackButton.jsx";

export default function ProposalDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proposal, setProposal] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await fetch(`${CORE_API_BASE_URL}/proposal/details?proposalId=${id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Błąd podczas pobierania szczegółów propozycji');

                const data = await response.json();
                setProposal(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProposal();
    }, [id]);


    if (error) return <BasePageLayout><p>{error}</p></BasePageLayout>;
    if (!proposal) return <BasePageLayout><p>Ładowanie...</p></BasePageLayout>;

    return (
        <BasePageLayout>
            <BackButton fallbackRoute={ROUTES.proposal.path}/>
            <h2>{proposal.type} {proposal.title}</h2>
            <p><strong>Opis:</strong> {proposal.description}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
            <p><strong>Proponowane przez:</strong> {proposal.proposedBy}</p>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate(ROUTES.proposalAccept.buildPath(proposal.id))}>
                    Przejdź dalej
                </button>

                <button onClick={async () => {
                    try {
                        await fetch(`http://localhost:8080/proposal/reject?proposalId=${id}`, {
                            method: 'POST',
                            credentials: 'include'
                        });
                        navigate(ROUTES.proposal.path);
                    } catch {
                        alert('Nie udało się odrzucić propozycji');
                    }
                }}>Odrzuć</button>
                <button onClick={() => navigate(-1)}>Wróć</button>
            </div>
        </BasePageLayout>
    );
}
