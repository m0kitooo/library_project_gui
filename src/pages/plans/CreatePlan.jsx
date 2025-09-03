"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx"
import ROUTES from "../../routes.jsx"
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js"

export default function CreatePlan() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        eventName: "",
        description: "",
        eventDate: "",
        location: "",
        budget: "",
    })
    const [error, setError] = useState(null)

    const [organizers, setOrganizers] = useState([])
    const [selectedOrganizer, setSelectedOrganizer] = useState("")

    useEffect(() => {
        const fetchOrganizers = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8080/users/list",
                    {
                        page: 0,
                        limit: 50,
                        filterFullname: ""
                    },
                    { withCredentials: true }
                )
                setOrganizers(response.data)
            } catch (err) {
                setError("Błąd pobierania organizatorów")
            }
        }

        fetchOrganizers()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (!selectedOrganizer) {
                setError("Musisz wybrać organizatora")
                setLoading(false)
                return
            }

            const payload = {
                name: formData.eventName,
                description: formData.description,
                estimatedPrice: formData.budget ? Number.parseFloat(formData.budget) : null,
                startTime: formData.eventDate,
                endTime: null,
                organizerId: Number(selectedOrganizer),
                proposedBy: "",
            }

            const response = await fetch(`${CORE_API_BASE_URL}/event-plan/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Błąd podczas tworzenia planu wydarzenia")
            }

            navigate(ROUTES.plans.path)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <BasePageLayout>
            <h2>Stwórz nowy plan wydarzenia</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="eventName">Nazwa wydarzenia:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="description">Opis:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="eventDate">Data wydarzenia:</label>
                    <input
                        type="datetime-local"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="location">Lokalizacja:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="budget">Budżet (PLN):</label>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>

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
                            <option key={o.id} value={o.id}>
                                {o.username}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Tworzenie..." : "Stwórz plan"}
                    </button>
                    <button type="button" onClick={() => navigate(ROUTES.plans.path)}>
                        Anuluj
                    </button>
                </div>
            </form>
        </BasePageLayout>
    )
}
