import React, { useState } from 'react';

const ProposalDetails = () => {
  const [proposalId, setProposalId] = useState('');
  const [proposalDetails, setProposalDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!proposalId) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/api/proposal/details?proposalId=${proposalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProposalDetails(data);
    } catch (err) {
      setError('Failed to fetch proposal details');
      console.error('Error fetching proposal details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Proposal Details</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="proposalId" style={{ display: 'block', marginBottom: '5px' }}>Proposal ID:</label>
          <input
            id="proposalId"
            type="text"
            value={proposalId}
            onChange={(e) => setProposalId(e.target.value)}
            placeholder="Enter proposal ID"
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Get Details'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {proposalDetails && (
        <div>
          <h3 style={{ marginTop: '0' }}>{proposalDetails.title}</h3>
          <p><strong>Description:</strong> {proposalDetails.description}</p>
          <p><strong>Status:</strong> {proposalDetails.status}</p>
          <p><strong>Proposed By:</strong> {proposalDetails.proposedBy}</p>
        </div>
      )}
    </div>
  );
};

export default ProposalDetails;