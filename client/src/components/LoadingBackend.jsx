import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnim from "../animations/cat.json";

export function LoadingBackend({ onReady }) {
  const [showAnim, setShowAnim] = useState(false);

  useEffect(() => {
    let pingTimer;
    let animTimer;

    animTimer = setTimeout(() => {
      setShowAnim(true);
    }, 500);

    const ping = async () => {
      try {
        const res = await fetch(
          "https://aqi-tracker-live-backend.onrender.com/ping",
          { cache: "no-store" }
        );
        const text = await res.text();
        if (res.ok && text.trim() === "OK") {
          onReady();
          return;
        }
      } catch {}
      pingTimer = setTimeout(ping, 3000);
    };

    ping();

    return () => {
      clearTimeout(pingTimer);
      clearTimeout(animTimer);
    };
  }, [onReady]);

  return (
    <div className="backend-loading">
      {showAnim && (
        <>
          <Lottie
            animationData={loadingAnim}
            loop
            style={{ width: 220 }}
          />
          <h2>Loading backend…</h2>
          <p>Server is waking up</p>
        </>
      )}
    </div>
  );
}
