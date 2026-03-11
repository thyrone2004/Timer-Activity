import { useMemo, useState } from "react";
import { Timer } from "./Timer";

const makeId = () => crypto.randomUUID?.() ?? String(Date.now() + Math.random());

export const Timers = () => {
  const [secondsInput, setSecondsInput] = useState(90);
  const [descInput, setDescInput] = useState("");

  const [timers, setTimers] = useState(() => []);

  const canSave = useMemo(() => {
    const s = Number(secondsInput);
    return Number.isFinite(s) && s > 0 && descInput.trim().length > 0;
  }, [secondsInput, descInput]);

  const addTimer = () => {
    if (!canSave) return;

    const s = Math.floor(Number(secondsInput));

    const newTimer = {
      id: makeId(),
      initialSeconds: s,
      secondsLeft: s,
      description: descInput.trim(),
      status: "paused",
    };

    setTimers((prev) => [...prev, newTimer]);
    setDescInput("");
    setSecondsInput(90);
  };

  const clearForm = () => {
    setSecondsInput(90);
    setDescInput("");
  };

  const deleteTimer = (id) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTimer = (id, updater) => {
    setTimers((prev) => prev.map((t) => (t.id === id ? updater(t) : t)));
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Timers</h1>

      {/* create timer */}
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          background: "white",
          border: "1px solid #e5e5e5",
          padding: 18,
          borderRadius: 10,
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Create Timer</h3>

        <label style={{ display: "block", marginBottom: 6, fontSize: 12 }}>
          Seconds
        </label>
        <input
          type="number"
          min={1}
          value={secondsInput}
          onChange={(e) => setSecondsInput(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 12,
            borderRadius: 6,
            border: "1px solid #ddd",
          }}
        />

        <label style={{ display: "block", marginBottom: 6, fontSize: 12 }}>
          Description
        </label>
        <textarea
          value={descInput}
          onChange={(e) => setDescInput(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 14,
            borderRadius: 6,
            border: "1px solid #ddd",
            resize: "none",
          }}
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={addTimer}
            disabled={!canSave}
            style={{
              padding: "10px 16px",
              borderRadius: 6,
              border: canSave ? "1px solid #148444" : "1px solid #b7d0bf",
              background: canSave ? "#17964a" : "#b9d1c5",
              color: "white",
              fontWeight: 700,
              cursor: canSave ? "pointer" : "not-allowed",
              boxShadow: canSave ? "0 1px 2px rgba(0,0,0,0.12)" : "none",
              transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            Save
          </button>

          <button
            onClick={clearForm}
            style={{
              padding: "10px 16px",
              borderRadius: 6,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <hr style={{ margin: "26px 0", border: "none", borderTop: "1px solid #eee" }} />

      {/* timer tiles */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        {timers.map((t) => (
          <Timer
            key={t.id}
            timer={t}
            onDelete={() => deleteTimer(t.id)}
            onChange={(updater) => updateTimer(t.id, updater)}
          />
        ))}
      </div>
    </div>
  );
};