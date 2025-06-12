import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";

export default function MemberList({ limit }) {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [fullnameFilter, setFullnameFilter] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const payload = {
        page: page,
        limit: limit,
        fullname: fullnameFilter.trim(),
      };

      console.log('Sending request:', payload);

      const response = await fetch(`${CORE_API_BASE_URL}/member/list`, {
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
      setMembers(data.userList || []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchMembers();
    }, 2000);

    return () => clearTimeout(handler);
  }, [page, limit, fullnameFilter]);

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Lista czytelników</h2>

      <input
        type="text"
        placeholder="Wyszukaj po imieniu lub nazwisku"
        value={fullnameFilter}
        onChange={e => setFullnameFilter(e.target.value)}
      />

      {members.length > 0 ? (
        <ul>
          {members.map((member) => (
            <li
              key={member.id}
              onClick={() => navigate(`/member/details/${member.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <strong>{member.name} {member.surname}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak wyników</p>
      )}

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
