"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx"
import ROUTES from "../../routes.jsx"
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js"
import { useAuth } from "../../auth/AuthContext.jsx"

export default function PlanEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        name: "",
        description: "",
        estimatedPrice: "",
        startTime: "",
        endTime: "",
    })

    const [organizers, setOrganizers] = useState([])
    const [selectedOrganizer, setSelectedOrganizer] = useState("")

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await fetch(`${CORE_API_BASE_URL}/event-plan/details/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                })
                if (!response.ok) throw new Error("Błąd podczas pobierania szczegółów planu")

                const data = await response.json()

                const formatDateTime = (dateString) => {
                    if (!dateString) return ""
                    try {
                        const d = new Date(dateString)
                        if (isNaN(d.getTime())) return ""
                        return d.toISOString().slice(0, 16)
                    } catch {
                        return ""
                    }
                }

                setForm({
                    name: data.name ?? "",
                    description: data.description ?? "",
                    estimatedPrice: data.estimatedPrice?.toString() ?? "",
                    startTime: formatDateTime(data.startTime),
                    endTime: formatDateTime(data.endTime),
                })

                // automatyczne ustawienie obecnego organizatora
                setSelectedOrganizer(data.organizerName ?? "")
            } catch (err) {
                setError(err.message)
            }
        }

        const fetchOrganizers = async () => {
            if (user?.role !== "MANAGER") return
            try {
                const response = await fetch(`${CORE_API_BASE_URL}/users/list`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        page: 0,
                        limit: 50,
                        filterFullname: ""
                    })
                })
                if (!response.ok) throw new Error("Błąd pobierania organizatorów")
                const data = await response.json()
                setOrganizers(data)
            } catch (err) {
                setError("Błąd pobierania organizatorów")
            }
        }

        fetchPlan()
        fetchOrganizers()
    }, [id, user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const payload = {
                id: Number(id),
                name: form.name,
                description: form.description,
                estimatedPrice: form.estimatedPrice ? Number.parseFloat(form.estimatedPrice) : null,
                startTime: form.startTime,
                endTime: form.endTime,
            }

            if (user?.role === "MANAGER" && selectedOrganizer) {
                payload.organizerName = selectedOrganizer
            }

            const response = await fetch(`${CORE_API_BASE_URL}/event-plan/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            })

            if (!response.ok) {
                const text = await response.text()
                throw new Error(`Błąd podczas zapisu: ${text || response.status}`)
            }

            alert("Plan został zaktualizowany")
            navigate(ROUTES.planDetails.buildPath(id))
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <BasePageLayout>
            <h2>Edytuj plan</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleEdit} style={{ maxWidth: "500px" }}>
                <div>
                    <label>Nazwa</label>
                    <input name="name" value={form.name} onChange={handleChange} />
                </div>

                <div>
                    <label>Opis</label>
                    <textarea name="description" value={form.description} onChange={handleChange} />
                </div>

                <div>
                    <label>Budżet (PLN)</label>
                    <input name="estimatedPrice" value={form.estimatedPrice} onChange={handleChange} />
                </div>

                <div>
                    <label>Data rozpoczęcia</label>
                    <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} />
                </div>

                <div>
                    <label>Data zakończenia</label>
                    <input type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} />
                </div>

                {user?.role === "MANAGER" && (
                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="organizer">Organizator:</label>
                        <select
                            id="organizer"
                            value={selectedOrganizer}
                            onChange={(e) => setSelectedOrganizer(e.target.value)}
                            required
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        >
                            <option value="">-- wybierz organizatora --</option>
                            {organizers.map((o) => (
                                <option key={o.id} value={o.username}>
                                    {o.username}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div style={{ marginTop: 12, display: "flex", gap: "10px" }}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Zapisywanie..." : "Zapisz"}
                    </button>
                    <button type="button" onClick={() => navigate(ROUTES.planDetails.buildPath(id))}>
                        Anuluj
                    </button>
                </div>
            </form>
        </BasePageLayout>
    )
}
