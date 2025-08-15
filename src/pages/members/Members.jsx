import { useEffect, useState } from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import BasePageLayout from "../../components/BasePageLayout.jsx";
import useFetch from "../../hooks/useFetch.js";
import { useMemo } from "react";

export default function Members() {
  const options = useMemo(() => ({
    method: 'GET',
    credentials: 'include'  
  }), []);

  const {data, loading, error} = useFetch(`${CORE_API_BASE_URL}/members`, options);
  console.log(data, loading, error);


  // const {data, loading, error} = useFetch(`${CORE_API_BASE_URL}/members`, {method: 'GET', credentials: 'include'});
  // console.log(data, loading, error);



  // const [members, setMembers] = useState([]);

  // useEffect(() => {
  //   async function fetchMembers() {
  //     try {
  //       const response = await fetch(`${CORE_API_BASE_URL}/members`, {
  //         credentials: 'include'
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMembers(data);
  //       }
  //     } catch (error) {
  //       console.error('Error: ', error)
  //     }
  //   }
  //   fetchMembers();
  // }, []);

//   if (loading) return <div>Loading...</div>;
// if (error) return <div>Error: {error.message}</div>;
// if (!Array.isArray(members)) return <div>No members found.</div>;

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
