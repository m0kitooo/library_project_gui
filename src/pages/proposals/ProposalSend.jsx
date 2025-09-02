import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx";
import ROUTES from "../../routes.jsx";

export default function ProposalSend() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [proposedBy, setProposedBy] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      proposedBy,
    };

    try {
      const response = await fetch('http://localhost:8080/proposal/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (response.ok) {
        alert(`Propozycja zostało wysłana pomyślnie!`);
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
      <form onSubmit={handleSubmit}>
        <div>
          <input
              type="text"
              placeholder="*Tytuł"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          /><br/>
          <input
              type="text"
              placeholder="Opis"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          /><br/>
          <input
              type="text"
              placeholder="Autor pomysłu"
              value={proposedBy}
              onChange={(e) => setProposedBy(e.target.value)}
          /><br/>
        </div>
        <button type="submit">Wyślij propozycję</button>
      </form>
    </BasePageLayout>
  );
}
