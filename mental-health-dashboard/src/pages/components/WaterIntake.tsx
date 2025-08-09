import { useEffect, useMemo, useState } from "react";
import "./WaterIntake.css";

const STORAGE_KEY = "waterIntakeDaily";

function todayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

interface Props {
  goal?: number;
  icon?: "drop" | "cup";
}

export default function WaterIntakeTracker({ goal = 8, icon = "drop" }: Props) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.date === todayKey()) {
        setCount(Number(parsed.count) || 0);
      }
    } catch {
      // ignore errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: todayKey(), count })
      );
    } catch {
      // ignore errors
    }
  }, [count]);

  const slots = useMemo(() => Array.from({ length: goal }, (_, i) => i), [goal]);

  function handleIconClick(i: number) {
    const next = i + 1;
    if (next === count) {
      setCount(Math.max(0, count - 1));
    } else {
      setCount(next);
    }
  }

  const handleIncrement = () => setCount((c) => Math.min(goal, c + 1));
  const handleDecrement = () => setCount((c) => Math.max(0, c - 1));
  const handleReset = () => setCount(0);

  const pct = Math.round((count / goal) * 100);
  const label = icon === "cup" ? "🥤" : "💧";

  return (
    <div className="water-card" aria-label="Water intake tracker">
      <h3 className="water-title">Water Intake</h3>
      <div className="water-row" role="list" aria-label="Water goal icons">
        {slots.map((i) => {
          const filled = i < count;
          return (
            <button
              key={i}
              type="button"
              role="listitem"
              className={`water-icon ${filled ? "filled" : ""}`}
              aria-pressed={filled}
              aria-label={`Set water count to ${i + 1}`}
              onClick={() => handleIconClick(i)}
            >
              <span className="icon-emoji" aria-hidden>
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="water-stats">
        <div className="water-counter">
          <strong>{count}</strong> / {goal}
        </div>
        <div className="water-progress" aria-hidden>
          <div className="water-progress-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="water-percent">{pct}%</div>
      </div>
      <div className="water-actions">
        <button type="button" onClick={handleDecrement} className="water-btn">
          −
        </button>
        <button type="button" onClick={handleIncrement} className="water-btn">
          +
        </button>
        <button type="button" onClick={handleReset} className="water-btn ghost">
          Reset
        </button>
      </div>
    </div>
  );
}
