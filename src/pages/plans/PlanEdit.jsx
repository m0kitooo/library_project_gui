"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx";
import ROUTES from "../../routes.jsx"
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js"

export default function PlanEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        name: "",
        description: "",
        estimatedPrice: "",
        startTime: "",
        endTime: "",
    })

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
                        if (typeof dateString === 'object') {
                            const {year, month, day, hour, minute, second} = dateString
                            if (year && month && day) {
                                const mm = String(month).padStart(2,'0')
                                const dd = String(day).padStart(2,'0')
                                const hh = String(hour ?? 0).padStart(2,'0')
                                const min = String(minute ?? 0).padStart(2,'0')
                                return `${year}-${mm}-${dd}T${hh}:${min}`
                            }
                        }
                        if (typeof dateString === 'number') {
                            const d = new Date(dateString)
                            if (isNaN(d.getTime())) return ""
                            return d.toISOString().slice(0,16)
                        }
                        const d = new Date(dateString)
                        if (isNaN(d.getTime())) return ""
                        return d.toISOString().slice(0, 16)
                    } catch (e) {
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
            } catch (err) {
                setError(err.message)
            }
        }
        fetchPlan()
    }, [id])

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

            <form onSubmit={handleEdit}>
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

                <div style={{ marginTop: 12 }}>
                    <button type="submit" disabled={loading}>Zapisz</button>
                </div>
            </form>
        </BasePageLayout>
    )
}
