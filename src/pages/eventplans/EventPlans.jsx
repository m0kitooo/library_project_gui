import React, {useEffect} from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import DialogBox from "../../components/DialogBox.jsx";
import {Link} from "react-router-dom";

export default function EventPlans() {
  const organizerId = 1; // zmienić
  const [page, setPage] = React.useState(0);
  const [eventPlans, setEventPlans] = React.useState([]);

  const [dialogMessage, setDialogMessage] = React.useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${CORE_API_BASE_URL}/event-plans?organizerId=${organizerId}&page=${page}&limit=20`,
          {
            method: "GET",
          });

        if (!response.ok) {
          throw new Error('Błąd podczas pobierania danych');
        }

        const data = await response.json();
        setEventPlans(data);
      } catch (err) {
        setDialogMessage(err.message);
      }
    };

    fetchUsers();
  }, [page]);

  if (dialogMessage) {
    return <DialogBox message={dialogMessage} returnLink={"/proposal"}/>
  }

  return (
    <>
      <h2>Plany wydarzeń</h2>
      {eventPlans.length !== 0 ? (
        <ul>
          {eventPlans.map((eventPlan) => (
          <li>
            <Link to={`/eventPlans/${eventPlan.id}`}>
              {eventPlan.name} {eventPlan.status}
            </Link>
          </li>
          ))}
        </ul>
      ) : (
        <p>Nie ma dostępnych żadnych organizatorów.</p>
      )}
    </>
  )
}