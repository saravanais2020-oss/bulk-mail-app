import React, { useState } from "react";
import axios from "axios";

function App() {

  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [emails, setEmails] = useState("");

  function send() {

    if (!subject || !msg || !emails) {
      alert("Fill all fields ❗");
      return;
    }

    axios.post("https://bulk-mail-app-1-66zs.onrender.com/sendmail", {
      subject,
      msg,
      emails: emails.split(",")
    })
    .then(() => alert("Emails Sent ✅"))
    .catch(() => alert("Error ❌"));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-300">

      <div className="bg-black text-white text-center py-3 text-xl font-semibold">
        BULKMAIL
      </div>

      <div className="bg-blue-900 text-white text-center py-2">
        We can help your business with sending multiple emails at once
      </div>

      <div className="bg-blue-700 text-white text-center py-2 font-medium">
        Drag and Drop
      </div>

      <div className="flex flex-col items-center mt-6 gap-4">

        <input
          placeholder="Enter Subject"
          onChange={(e) => setSubject(e.target.value)}
          className="w-[80%] p-3 rounded-md border"
        />

        <textarea
          placeholder="Enter Message"
          onChange={(e) => setMsg(e.target.value)}
          className="w-[80%] h-28 p-3 rounded-md border"
        />

        <textarea
          placeholder="Enter Emails (comma separated)"
          onChange={(e) => setEmails(e.target.value)}
          className="w-[80%] h-24 p-3 rounded-md border"
        />

        <div className="w-[80%] border-2 border-dashed border-white p-6 text-center bg-blue-400">
          <input type="file" />
        </div>

        <p>Total Emails: {emails ? emails.split(",").length : 0}</p>

        <button
          onClick={send}
          className="bg-black text-white px-6 py-2 rounded-md"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default App;
