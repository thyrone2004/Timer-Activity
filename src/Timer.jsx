import { Pause, Play, Square, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

const pad2 = (n) => String(n).padStart(2, "0");
const formatMMSS = (totalSeconds) => {
  const s = Math.max(0, totalSeconds);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${pad2(mm)}:${pad2(ss)}`;
};

const IconButton = ({ bg, border, color, children, onClick, title }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 38,
        height: 34,
        borderRadius: 6,
        border: `1px solid ${border}`,
        background: bg,
        color,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        padding: 0,
        fontSize: 14,
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
};

export const Timer = ({ timer, onDelete, onChange }) => {
  const { secondsLeft, status, description } = timer;

  const intervalRef = useRef(null);

  // Start/stop interval based on status
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (status !== "playing") return;

    intervalRef.current = setInterval(() => {
      onChange((prev) => {

        if (prev.status !== "playing") return prev;

        const next = prev.secondsLeft - 1;

        if (next <= 0) {
          return { ...prev, secondsLeft: 0, status: "finished" };
        }
        return { ...prev, secondsLeft: next };
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, onChange]);

  const isPlaying = status === "playing";
  const canStop = status !== "stopped";

  // PLAY button
  const playHandler = () => {
    onChange((prev) => {
      if (prev.status === "finished" || prev.status === "stopped") {
        return { ...prev, secondsLeft: prev.initialSeconds, status: "playing" };
      }
      return { ...prev, status: "playing" }; // resume
    });
  };

  // PAUSE button
  const pauseHandler = () => {
    onChange((prev) => ({ ...prev, status: "paused" }));
  };

  // STOP button
  const stopHandler = () => {
    onChange((prev) => ({
      ...prev,
      secondsLeft: prev.initialSeconds,
      status: "stopped",
    }));
  };

  const statusText =
    status === "playing"
      ? "Playing"
      : status === "finished"
        ? "Finished"
        : status === "stopped"
          ? "Stopped"
          : "Paused";

  return (
    <div
      style={{
        width: 230,
        border: "2px solid #d9d9d9",
        borderRadius: 10,
        padding: 14,
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: 38, fontWeight: 800, textAlign: "center" }}>
        {formatMMSS(secondsLeft)}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 12,
        }}
      >
        {isPlaying ? (
          <>
            {/* Pause */}
            <IconButton
              bg="#c58a16"
              border="#a87412"
              color="white"
              onClick={pauseHandler}
              title="Pause"
            >
              <Pause size={18} strokeWidth={2.5} />
            </IconButton>

            {/* Stop */}
            <IconButton
              bg="#d81f26"
              border="#b31a1f"
              color="white"
              onClick={stopHandler}
              title="Stop"
            >
              <Square size={17} fill="currentColor" strokeWidth={2.5} />
            </IconButton>
          </>
        ) : (
          <>
            {/* Play */}
            <IconButton
              bg="#0b3b2e"
              border="#0b3b2e"
              color="white"
              onClick={playHandler}
              title="Play"
            >
              <Play size={18} fill="currentColor" strokeWidth={2.5} />
            </IconButton>

            {/* Stop */}
            {canStop ? (
              <IconButton
                bg="#d81f26"
                border="#b31a1f"
                color="white"
                onClick={stopHandler}
                title="Stop"
              >
                <Square size={17} fill="currentColor" strokeWidth={2.5} />
              </IconButton>
            ) : null}
          </>
        )}

        {/* Delete */}
        <IconButton
          bg="white"
          border="#cfcfcf"
          color="#333"
          onClick={onDelete}
          title="Delete"
        >
          <Trash2 size={17} strokeWidth={2.25} />
        </IconButton>
      </div>

      <input
        readOnly
        value={description}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 6,
          border: "1px dashed #ddd",
          background: "#fafafa",
          fontSize: 12,
        }}
      />

      <div style={{ marginTop: 10, fontSize: 11, color: "#666", textAlign: "center" }}>
        Status: {statusText}
      </div>
    </div>
  );
};