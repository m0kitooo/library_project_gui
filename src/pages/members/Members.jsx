import { useEffect, useState } from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import BasePageLayout from "../../components/BasePageLayout.jsx";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/members`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        }
      } catch (error) {
        console.error('Error: ', error)
      }
    }
    fetchMembers();
  }, []);

  return (
    <BasePageLayout>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            <span>{`Imię: ${member.name}`}</span>
            <span>{`Nazwisko: ${member.surname}`}</span>
            <span>{`Pesel: ${member.pesel}`}</span>
          </li>
        ))}
      </ul>
    </BasePageLayout>
  );
}
