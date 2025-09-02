"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BasePageLayout from "../../components/BasePageLayout.jsx"
import ROUTES from "../../routes.jsx"
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js"

export default function PlanDetails() {
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [plan, setPlan] = useState(null)
    const [error, setError] = useState(null)

    const fetchPlan = async () => {
        try {
            const response = await fetch(`${CORE_API_BASE_URL}/event-plan/details/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            })
            if (!response.ok) throw new Error("Błąd podczas pobierania szczegółów planu")

            const data = await response.json()
            setPlan(data)
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {

        fetchPlan();
    }, [id])

    const handleStatusChange = async (newStatus) => {
        try {
            setLoading(true)
            const response = await fetch(`${CORE_API_BASE_URL}/event-plan/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Number(id),
                    planStatus: newStatus,
                }),
                credentials: "include",
            })

            if (!response.ok) throw new Error("Błąd podczas aktualizacji statusu")

            fetchPlan()
            alert("Plan został zaktualizowany")
            navigate(`${ROUTES.plans.path}`)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const sendForApproval = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${CORE_API_BASE_URL}/event-plan/send-for-approval/${id}`, {
                method: 'POST',
                credentials: 'include'
            })
            if (!res.ok) throw new Error('Błąd podczas wysyłania do akceptacji')

            fetchPlan()
            alert("Plan został wysłany do akceptacji")
            navigate(`${ROUTES.plans.path}`)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const approvePlan = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${CORE_API_BASE_URL}/event-plan/approve/${id}`, {
                method: 'POST',
                credentials: 'include'
            })
            if (!res.ok) throw new Error('Błąd podczas zatwierdzania planu')
            fetchPlan()
            alert("Plan został zatwierdzony")
            navigate(`${ROUTES.plans.path}`)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (error)
        return (
            <BasePageLayout>
                <p>{error}</p>
            </BasePageLayout>
        )
    if (!plan)
        return (
            <BasePageLayout>
                <p>Ładowanie...</p>
            </BasePageLayout>
        )

    return (
        <BasePageLayout>
            <h2>{plan.name}</h2>
            <p>
                <strong>Opis:</strong> {plan.description}
            </p>
            <p>
                <strong>Data rozpoczęcia:</strong> {plan.startTime ? new Date(plan.startTime).toLocaleString("pl-PL") : "Brak"}
            </p>
            <p>
                <strong>Data zakończenia:</strong> {plan.endTime ? new Date(plan.endTime).toLocaleString("pl-PL") : "Brak"}
            </p>
            <p>
                <strong>Budżet:</strong> {plan.estimatedPrice ? `${plan.estimatedPrice} PLN` : "Nie określono"}
            </p>
            <p>
                <strong>Status:</strong> {plan.planStatus}
            </p>
            <p>
                <strong>Organizator:</strong> {plan.organizerName}
            </p>
            <p>
                <strong>Zaproponował:</strong> {plan.proposedBy}
            </p>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {plan.planStatus === "DRAFT" && (
                    <button onClick={() => handleStatusChange("ACTIVE")} disabled={loading}>
                        Aktywuj plan
                    </button>
                )}

                {plan.planStatus === "ACTIVE" && (
                    <>
                        <button onClick={() => handleStatusChange("COMPLETED")} disabled={loading}>
                            Oznacz jako zakończony
                        </button>
                        <button onClick={() => handleStatusChange("CANCELLED")} disabled={loading}>
                            Anuluj plan
                        </button>
                    </>
                )}

                <div>
                    <button onClick={() => navigate(`/plans/${id}/edit`)}>Edytuj plan</button>
                    <button onClick={sendForApproval} disabled={loading}>Wyślij do akceptacji</button>
                    <button onClick={approvePlan} disabled={loading}>Zatwierdź plan</button>
                </div><br/>
                <button onClick={() => navigate(ROUTES.plans.path)}>Wróć do listy planów</button>
            </div>
        </BasePageLayout>
    )
}
