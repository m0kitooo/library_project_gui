import { useEffect, useState } from 'react';

export default function ProposalList({ status, page, limit }) {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState(null);

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

        const data = await response.json();
        console.log(data);
        setProposals(data.proposals || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProposals();
  }, [status, page, limit]);

  if (error) return <p>{error}</p>;

  return (
    <ul>
      {proposals.map((proposal) => (
        <li key={proposal.id}>
          <strong>{proposal.title}</strong> — {proposal.description}
        </li>
      ))}
    </ul>
  );
}
