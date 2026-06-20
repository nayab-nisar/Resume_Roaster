import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Flame } from "lucide-react";
import api from "../api/axios.js";

const HEAT_TEXT_COLOR = {
  Mild: "text-gold",
  Medium: "text-ember",
  "Well Done": "text-emberDeep",
  Charred: "text-emberDeep",
};

const History = () => {
  const [roasts, setRoasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/roast/history");
    setRoasts(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/roast/${id}`);
    setRoasts((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-2xl font-bold text-ash">Your roast history</h1>
      <p className="mt-1 text-sm text-smoke">Every resume that's been through the fire.</p>

      {loading ? (
        <p className="mt-10 text-center text-smoke">Loading…</p>
      ) : roasts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <Flame className="mx-auto h-6 w-6 text-ember" />
          <p className="mt-3 text-ash">No resumes roasted yet.</p>
          <p className="mt-1 text-sm text-smoke">Upload one and let's see what's burning.</p>
          <Link
            to="/dashboard"
            className="mt-5 inline-block rounded-xl bg-ember px-5 py-2.5 font-display font-semibold text-bg transition hover:bg-gold"
          >
            Roast a resume
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {roasts.map((r) => (
            <li
              key={r._id}
              className="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-4"
            >
              <Link to={`/roast/${r._id}`} className="flex-1">
                <p className="font-medium text-ash">{r.fileName}</p>
                <p className="mt-0.5 text-xs text-smoke">
                  {new Date(r.createdAt).toLocaleDateString()} ·{" "}
                  <span className={HEAT_TEXT_COLOR[r.heatLevel]}>{r.heatLevel}</span>
                </p>
              </Link>
              <div className="flex items-center gap-4">
                <span className="font-mono text-lg font-semibold text-gold">{r.score}</span>
                <button
                  onClick={() => handleDelete(r._id)}
                  aria-label="Delete roast"
                  className="text-smoke transition hover:text-emberDeep"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
