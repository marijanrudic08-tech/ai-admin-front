// utils/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getResponse(message) {
  const res = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("Greška kod backend poziva");
  }

  return await res.json();
}
