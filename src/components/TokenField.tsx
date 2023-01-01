import { useState } from "react";

export function TokenField() {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");

  return (
    <div>
      <p>
        Personal Access Token
        <input
          type="text"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
          }}
        />
      </p>
      <button
        onClick={() => {
          localStorage.setItem("token", token);
        }}
      >
        Save
      </button>
    </div>
  );
}
