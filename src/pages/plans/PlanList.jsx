"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx";
import ROUTES from "../../routes.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";

export default function PlanList({ status, page, limit }) {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(status || "ALL");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const fetchPlans = async () => {
            try {
                const payload = {
                    planStatus: selectedStatus === "ALL" ? null : selectedStatus,
                    page: page ?? 0,
                    limit: limit ?? 10,
                };

                const response = await fetch(`${CORE_API_BASE_URL}/event-plan/list`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Błąd podczas pobierania danych");

                const data = await response.json();
                setPlans(data.plans || []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPlans();
    }, [selectedStatus, page, limit, user]);

    if (!user) {
        return <p>Musisz być zalogowany, aby przeglądać plany wydarzeń.</p>;
    }

    const createPath = ROUTES.createPlan.path;

    return (
        <BasePageLayout>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                    <label htmlFor="statusFilter">Filtruj według statusu: </label>
                    <select
                        id="statusFilter"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        style={{ padding: 5, marginLeft: 10 }}
                    >
                        <option value="ALL">Wszystkie</option>
                        <option value="PREPARING">W przygotowaniu</option>
                        <option value="SUSPENDED">Zawieszone</option>
                        <option value="REJECTED">Odrzucone</option>
                    </select>
                </div>

                <button
                    onClick={() => navigate(createPath)}
                    style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        cursor: "pointer",
                    }}
                >
                    + Dodaj plan
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {!error && plans.length === 0 && <p>Nie ma dostępnych planów wydarzeń.</p>}

            <div style={{ display: "grid", gap: 15 }}>
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        onClick={() => navigate(ROUTES.planDetails.buildPath(plan.id))}
                        style={{
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            padding: 15,
                            borderRadius: 8,
                        }}
                    >
                        <h3 style={{ margin: "0 0 10px 0" }}>{plan.name}</h3>
                        <p style={{ margin: "5px 0", color: "#666" }}>{plan.description}</p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10, fontSize: 14, color: "#555" }}>
                            <span><strong>Od:</strong> {plan.startTime ? new Date(plan.startTime).toLocaleString("pl-PL") : "-"}</span>
                            <span><strong>Do:</strong> {plan.endTime ? new Date(plan.endTime).toLocaleString("pl-PL") : "-"}</span>
                            <span><strong>Proposed by:</strong> {plan.proposedBy ?? "-"}</span>
                            <span><strong>Organizer:</strong> {plan.organizerUsername ?? "-"}</span>
                        </div>

                        <div style={{ marginTop: 10 }}>
              <span
                  style={{
                      padding: "4px 8px",
                      borderRadius: 4,
                      fontSize: 12,
                  }}
              >
                {plan.planStatus}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </BasePageLayout>
    );
}
