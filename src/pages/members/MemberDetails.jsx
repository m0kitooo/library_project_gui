import React, {useEffect, useState} from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import {useNavigate, useParams} from "react-router-dom";
import proposalDetails from "../proposals/ProposalDetails.jsx";
import DialogBox from "../../components/DialogBox.jsx";

export default function MemberDetails(member) {
  const { id: memberId } = useParams();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();

  const [dialogMessage, setDialogMessage] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (!memberId) return;

      const payload = {
        memberId,
      }

      try {
        const response = await fetch(`${CORE_API_BASE_URL}/member/details?id=${memberId}`, {
          method: 'POST',
          headers: {},
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setName(data.name);
        setSurname(data.name);
      } catch (err) {
        setDialogMessage('Nie udało się pobrać informacji');
        console.error('Error fetching proposal details:', err);
      }
    }
    fetchMemberDetails();
  }, [name, surname]);

  if (dialogMessage !== null) {
    return (
      <DialogBox
        message={dialogMessage}
        returnLink='/proposal'
      />
    )
  }

  return (
    <>
      <h2>Dane czytelnika</h2>

      <div>
        <p>{name} {surname}</p>
      </div>
    </>
  )
}