import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";

export default function ProposalList({status, limit}) {
  const [proposals, setProposals] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProposals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${CORE_API_BASE_URL}/proposals?status=${status}&page=${page}&limit=${limit}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error('Błąd podczas pobierania danych');
        }

        const data = await response.json();
        setProposals(data.proposals || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();

    return () => {
      abortController.abort();
    };
  }, [status, page, limit]);

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Lista propozycji</h2>

      {(() => {
        if (proposals.length > 0) {
          return (
            <ul>
              {proposals.map((proposal) => (
                <li
                  key={proposal.id}
                  onClick={() => navigate(`/proposal/${proposal.id}`)}
                  style={{cursor: 'pointer'}}
                >
                  <strong>{proposal.title}</strong> — {proposal.description}
                </li>
              ))}
            </ul>
          );
        }
      })()}

      <label htmlFor="page">Strona</label>
      <input
        id="page"
        type="number"
        min="0"
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
      />
    </div>
  );
}