import BasePageLayout from "../components/BasePageLayout.jsx";
import {useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import routes from "../routes.jsx";

export default function SelectMemberForBookLoan() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const { bookId } = useParams();

  const fetchMembers = () => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/members`, {
          credentials: 'include'
        });
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
        <ul className={'ul-reset'}>
          {members.map(member =>
            <li key={member.id} className={'base-wrapper'}>
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
                    }),
                    credentials: 'include'
                  });
                  if (response.ok)
                    navigate(routes.app.path);
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