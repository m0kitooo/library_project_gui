import BasePageLayout from "../components/BasePageLayout.jsx";
import {useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useParams} from "react-router-dom";

export default function SelectMemberForBookLoan() {
  const [members, setMembers] = useState([]);
  const { bookId } = useParams();

  const fetchMembers = () => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/members`);
        const jsonData = await response.json();
        setMembers(jsonData);
      } catch (error) {
        console.error('Error: ', error);
      }
    })();
  };

  useEffect(() =>  {
    fetchMembers()
  }, []);

  return (
    <>
      <BasePageLayout>
        <SearchBar/>
        <button onClick={fetchMembers}>Reload</button>
        <ul>
          {members.map(member =>
            <li key={member.id}>
              <span>{member.name}</span>
              <span>{member.surname}</span>
              <button onClick={async () => {
                try {
                  const response = await fetch(`${CORE_API_BASE_URL}/book-loans`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      bookId: bookId,
                      memberId: member.id
                    })
                  });
                  if (!response.ok) {
                    console.error('Error: ', response.status, await response.text())
                  }
                } catch (error) {
                  console.error('Error: ', error)
                }
              }}>
                Wypożycz
              </button>
            </li>
          )}
        </ul>
      </BasePageLayout>
    </>
  );
}