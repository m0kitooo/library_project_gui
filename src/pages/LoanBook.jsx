import BasePageLayout from "../components/BasePageLayout.jsx";
import {useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";

export default function LoanBook() {
  const [members, setMembers] = useState([]);

  const fetchMembers = () => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/member`);
        const jsonData = await response.json();
        setMembers(jsonData);
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  };

  useEffect(() =>  {
    fetchMembers()
  }, []);

  return (
    <>
      <BasePageLayout>
        <button onClick={fetchMembers}>Reload</button>
        <ul>
          {members.map(member =>
            <li key={member.id}>
              <span>{JSON.stringify(member)}</span>
            </li>
          )}
        </ul>
      </BasePageLayout>
    </>
  )
}