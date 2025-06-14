import React, {useState, useEffect} from 'react';
import {useParams, useLocation} from "react-router-dom";
import DialogBox from "../../components/DialogBox.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";

export default function OrganizerList() {
  const { id: proposalId } = useParams();
  const location = useLocation();
  const limit = location.state?.limit || 10;
  const title = location.state?.title;
  const description = location.state?.description;
  const proposedBy = location.state?.proposedBy;


  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [filterFullName, setFilterFullName] = useState("");

  const [dialogMessage, setDialogMessage] = useState(null);

  const [selectedOrganizerId, setSelectedOrganizerId] = useState(null);

  const modifyProposal = async () => {
    const payload = {
      title,
      description,
      proposedBy,
    }

    const response = await fetch(`${CORE_API_BASE_URL}/proposals/modify`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Cannot modify proposal.")
    }
  }

  const handleSubmit = async () => {
    if (!selectedOrganizerId) {
      setDialogMessage("Wybierz organizatora przed zatwierdzeniem.");
      return;
    }

    try {
      if (title && description && proposedBy) {
        await modifyProposal();
      }

      const response = await fetch(`${CORE_API_BASE_URL}/proposals/${proposalId}/accept?organizerId=${selectedOrganizerId}`, {
        method: "PUT",
      });

      if (response.ok) {
        const data = await response.json();
        setDialogMessage(`Plan utworzony. ID: ${data}`);
      } else {
        setDialogMessage("Błąd podczas akceptowania propozycji.");
      }
    } catch (err) {
      setDialogMessage(`Błąd podczas akceptowania propozycji. (${err})`);
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/users?page=${page}&limit=${limit}&filterFullName=${filterFullName}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error('Błąd podczas pobierania danych');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setDialogMessage(err.message);
      }
    };

    fetchUsers();
  }, [page, limit, title, description, proposedBy]);

  if (dialogMessage) {
    return <DialogBox message={dialogMessage} returnLink={"/proposal"} />
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {users.length !== 0 ? (
          users.map((user) => (
            <div key={user.id} style={{display: 'flex', alignItems: 'center', margin: '8px 0'}}>
              <input
                type="radio"
                name="organizer"
                id={`user-${user.id}`}
                checked={selectedOrganizerId === user.id}
                onChange={() => setSelectedOrganizerId(user.id)}
              />
              <label htmlFor={`user-${user.id}`} style={{cursor: 'pointer'}}>
                {user.name} {user.surname}
              </label>
            </div>
          ))
        ) : (
          <p>Nie ma dostępnych żadnych organizatorów.</p>
        )}

        <label htmlFor="page">Strona</label>
        <input
          id="page"
          type="number"
          min="0"
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
        />
      </form>

      <div>
        <button
          type="button"
          onClick={() => handleSubmit()}
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
      </div>
    </>
  )
}