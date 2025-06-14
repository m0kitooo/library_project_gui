import { useState } from 'react';
import { Link } from "react-router-dom";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import DialogBox from "../../components/DialogBox.jsx";

export default function ProposalSend() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [proposedBy, setProposedBy] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      proposedBy,
    };

    try {
      const response = await fetch(`${CORE_API_BASE_URL}/proposals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setResponseMessage('Zgłoszenie zostało wysłane pomyślnie!');
      } else {
        setResponseMessage('Błąd podczas wysyłania zgłoszenia.');
      }
    } catch (error) {
      setResponseMessage('Błąd połączenia z serwerem: ' + error);
    }

    setShowMessage(true);
  };

  if (showMessage) {
    return (
      <DialogBox message={responseMessage} returnLink={"/proposal"}/>
    );
  }

  return (
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
  );
}
