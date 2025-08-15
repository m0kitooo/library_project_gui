import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import DialogBox from "../../components/DialogBox.jsx";
import BasePageLayout from "../../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";

const ProposalDetails = () => {
  const { id: proposalId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [proposedBy, setProposedBy] = useState('');

  const [error, setError] = useState('');
  const [dialogMessage, setDialogMessage] = useState(null);

  useEffect(() => {
    const fetchProposalDetails = async () => {
      if (!proposalId) return;

      setError('');
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/api/proposal/details?proposalId=${proposalId}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setProposedBy(data.proposedBy);
      } catch (err) {
        setError('Failed to fetch proposal details');
        console.error('Error fetching proposal details:', err);
      }
    };

    fetchProposalDetails();
  }, [proposalId]);

  const handleReject = async () => {

    try {
      const response = await fetch(`${CORE_API_BASE_URL}/api/proposal/reject?proposalId=${proposalId}`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Reject failed');

      setDialogMessage('Pomyślnie odrzucono propozycję.')
    } catch (err) {
      setDialogMessage(`Błąd podczas odrzucania propozycji. (${err})`);
    }
  };

  return (
    <BasePageLayout>
      <div>
        <h2>Proposal Details</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="title">Tytuł</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
            <label htmlFor="description">Opis</label>
            <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
            <label htmlFor="proposedBy">Autor propozycji</label>
            <input
                id="proposedBy"
                type="text"
                value={proposedBy}
                onChange={(e) => setProposedBy(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <button
                type="button"
                onClick={navigate("proposal/chooseOrganizer")}
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
            <button
                type="button"
                onClick={handleReject}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FF2400',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
            >
              Odrzuć
            </button>
          </div>
        </form>
        {dialogMessage !== null ? (
            <DialogBox
                message={dialogMessage}
                returnLink='/proposal'
            />
        ) : null}
        {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
      </div>
    </BasePageLayout>
  );
};

export default ProposalDetails;
