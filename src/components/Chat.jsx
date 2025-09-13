import { useState } from "react";
import { getResponse } from "../utils/api"; // prilagodi path ako treba

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Dodaj korisnikovu poruku u chat
    setChat((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const data = await getResponse(message);

      // Backend vraća { reply: "..." } (prilagodi ako tvoj backend vraća nešto drugo)
      setChat((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Došlo je do greške. Provjeri backend." },
      ]);
    }

    setMessage(""); // reset input
  };

  return (
    <div>
      <h1>AI Admin Chat</h1>
      <div>
        {chat.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender === "user" ? "Ti:" : "AI:"}</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Napiši poruku..."
      />
      <button onClick={handleSend}>Pošalji</button>
    </div>
  );
}
