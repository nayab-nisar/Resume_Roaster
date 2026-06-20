import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Flame, ThumbsUp, Wrench } from "lucide-react";
import EmberGauge from "../components/EmberGauge.jsx";
import RoastCard from "../components/RoastCard.jsx";
import api from "../api/axios.js";

const RoastResult = () => {
  const { id } = useParams();
  const [roast, setRoast] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoast = async () => {
      try {
        const { data } = await api.get(`/roast/${id}`);
        setRoast(data);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load this roast.");
      }
    };
    fetchRoast();
  }, [id]);

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <p className="text-emberDeep">{error}</p>
        <Link to="/dashboard" className="mt-4 inline-block text-sm text-ember hover:text-gold">
          Try another resume
        </Link>
      </div>
    );
  }

  if (!roast) {
    return <div className="px-6 py-20 text-center text-smoke">Pulling it off the grill…</div>;
  }

  return (
    <div className="mx-auto max-w-3xl animate-rise px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <p className="text-xs uppercase tracking-widest text-smoke">{roast.fileName}</p>
        <div className="mt-6">
          <EmberGauge score={roast.score} heatLevel={roast.heatLevel} size="md" />
        </div>
        <p className="mt-6 max-w-lg font-display text-xl font-semibold text-ash">
          "{roast.verdict}"
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-1">
        <RoastCard
          title="What's burning"
          icon={Flame}
          items={roast.issues}
          tone="issue"
          emptyText="Surprisingly, nothing's on fire."
        />
        <RoastCard
          title="Still standing"
          icon={ThumbsUp}
          items={roast.strengths}
          tone="strength"
          emptyText="We're still looking for something to compliment."
        />
        <RoastCard
          title="How to put out the fire"
          icon={Wrench}
          items={roast.suggestions}
          tone="suggestion"
          emptyText="No fixes needed — rare."
        />
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <Link
          to="/dashboard"
          className="rounded-xl bg-ember px-6 py-3 font-display font-semibold text-bg transition hover:bg-gold"
        >
          Roast another resume
        </Link>
        <Link
          to="/history"
          className="rounded-xl border border-line px-6 py-3 font-display font-semibold text-ash transition hover:border-ember"
        >
          View history
        </Link>
      </div>
    </div>
  );
};

export default RoastResult;
