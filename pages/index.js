import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Greška:", error);
      const errorMessage = {
        role: "assistant",
        content: "⚠️ Došlo je do greške. Provjeri backend.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>💬 AI Admin Chat</h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "15px",
          minHeight: "400px",
          marginBottom: "15px",
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              margin: "8px 0",
            }}
          >
            <div
              style={{
                padding: "10px 15px",
                borderRadius: "18px",
                maxWidth: "70%",
                backgroundColor: msg.role === "user" ? "#007bff" : "#e5e5ea",
                color: msg.role === "user" ? "#fff" : "#000",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <p>⌛ AI razmišlja...</p>}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Napiši poruku..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 18px",
            cursor: "pointer",
          }}
        >
          Pošalji
        </button>
        <button
          onClick={clearChat}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 18px",
            cursor: "pointer",
          }}
        >
          Obriši
        </button>
      </div>
    </div>
  );
}
