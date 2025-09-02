import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

export default function ChooseOrganizer({page, limit}) {
  const { id: proposalId } = useParams();
  const [dialogMessage, setDialogMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const submit = async () => {
    const response = await fetch(`http://localhost:8080/api/proposal/accept?proposalId=${ProposalId}`, {
      method: "POST"
    });

    if (!response.ok) {
      setDialogMessage('Nie udało się zaakceptować propozycji.')
    } else {
      setDialogMessage('Pomyślnie zaakceptowano propozycję.')
    }
  }

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const payload = {
          page: page,
          limit: limit,
        };

        console.log(payload);

        const response = await fetch("http://localhost:8080/api/user/list", {
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
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProposals();
  }, [page, limit]);

  if (error) return <p>{error}</p>;
  if (users.length === 0) return <p>Nie ma dostępnych żadnych propozycji.</p>

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {users.map((user) => (
        <Checkbox
          label={`${user.name} ${user.surname}`}
          key={user.id}
          checked={selectedUserIds.includes(user.id)}
          onChange={() => handleCheckboxChange(user.id)}
          style={{cursor: 'pointer'}}
        />
      ))}
      <button
        type="button"
        onClick={submit}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '8px'
        }}
      >
        Zaakceptuj
      </button>
    </form>
  )
}
