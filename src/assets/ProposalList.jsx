import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProposalList({ status, page, limit }) {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const payload = {
          status: status,
          page: page,
          limit: limit,
        };

        console.log(payload);

        const response = await fetch("http://localhost:8080/api/proposal/list", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Błąd podczas pobierania danych');
        }

        console.log(response);
        const data = await response.json();
        setProposals(data.proposals || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProposals();
  }, [status, page, limit]);

  if (error) return <p>{error}</p>;
  if (proposals.length === 0) return <p>Nie ma dostępnych żadnych propozycji.</p>

  return (
    <ul>
      {proposals.map((proposal) => (
        <li
          key={proposal.id}
          onClick={() => navigate(`/proposal/details/${proposal.id}`)}
          style={{cursor: 'pointer'}}
        >
          <strong>{proposal.title}</strong> — {proposal.description}
        </li>
      ))}
    </ul>
  );
}
