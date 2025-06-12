import BasePageLayout from "../components/BasePageLayout.jsx";
import {useEffect, useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import SearchBar from "../components/SearchBar.jsx";

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
        <SearchBar/>
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