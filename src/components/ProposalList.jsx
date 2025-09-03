import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BasePageLayout from "./BasePageLayout/BasePageLayout.jsx";
import ROUTES from "../routes.jsx";
import { useAuth } from '../auth/AuthContext.jsx';

export default function ProposalList({ status, page, limit }) {
    const { user } = useAuth();
    const [proposals, setProposals] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "MANAGER") return;

        const fetchProposals = async () => {
            try {
                const payload = {
                    status: status || 'PENDING',
                    page: page ?? 0,
                    limit: limit ?? 10
                };

                const response = await fetch("http://localhost:8080/proposal/list", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    credentials: 'include'
                });

                if (!response.ok) throw new Error('Błąd podczas pobierania danych');

                const data = await response.json();
                setProposals(data.proposals || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProposals();
    }, [status, page, limit, user]);

    return (
        <BasePageLayout>
            <Link to={ROUTES.proposalSend.path} style={{ display: "inline-block", marginBottom: "15px" }}>
                Wyślij propozycję
            </Link>

            {!user || user.role !== "MANAGER" ? (
                <p>Nie masz uprawnień do przeglądania listy propozycji.</p>
            ) : (
                <>
                    {error && <p>{error}</p>}
                    {!error && proposals.length === 0 && <p>Nie ma dostępnych żadnych propozycji.</p>}
                    <ul>
                        {proposals.map((proposal) => (
                            <li
                                key={proposal.id}
                                onClick={() => navigate(ROUTES.proposalDetails.buildPath(proposal.id))}
                                style={{ cursor: 'pointer', marginBottom: '10px' }}
                            >
                                <strong>{proposal.title}</strong> — {proposal.description}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </BasePageLayout>
    );
}
