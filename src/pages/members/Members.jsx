import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import BasePageLayout from "../../components/BasePageLayout.jsx";
import useFetch from "../../hooks/useFetch.js";

export default function Members() {
  const {data, loading, error} = useFetch(`${CORE_API_BASE_URL}/members`, { 
    credentials: 'include'}
  );

  return (
    <BasePageLayout>
      {loading && <span>Loading...</span>}
      {!loading && !error && (
        <ul>
        {data.map(member => (
          <li key={member.id}>
            <span>{`Imię: ${member.name}`}</span>
            <span>{`Nazwisko: ${member.surname}`}</span>
            <span>{`Pesel: ${member.pesel}`}</span>
          </li>
        ))}
      </ul>
      )}
    </BasePageLayout>
  );
}
