import React from "react";
import { Link } from "react-router-dom";
import { Flame, Gauge, MessageSquareWarning, Wrench } from "lucide-react";

const Landing = () => (
  <div className="mx-auto max-w-4xl px-6 py-20">
    <div className="animate-rise text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs uppercase tracking-widest text-smoke">
        <Flame className="h-3.5 w-3.5 text-ember" />
        Honest feedback, served hot
      </span>

      <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-ash sm:text-6xl">
        Your resume isn't ready.
        <br />
        <span className="text-ember">We'll tell you why.</span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-smoke">
        Upload your resume and get roasted by AI — sharp, funny, and brutally specific
        feedback that actually makes it better before a recruiter ever sees it.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          to="/register"
          className="rounded-xl bg-ember px-6 py-3 font-display font-semibold text-bg transition hover:bg-gold"
        >
          Get roasted — it's free
        </Link>
        <Link
          to="/login"
          className="rounded-xl border border-line px-6 py-3 font-display font-semibold text-ash transition hover:border-ember"
        >
          I already have an account
        </Link>
      </div>
    </div>

    <div className="mt-20 grid gap-5 sm:grid-cols-3">
      <FeatureCard
        icon={Gauge}
        title="Heat Score"
        text="A 0–100 score with a Mild-to-Charred heat level, so you know exactly how done your resume is."
      />
      <FeatureCard
        icon={MessageSquareWarning}
        title="What's burning"
        text="Specific call-outs on weak bullet points, vague claims, and dead-weight phrases."
      />
      <FeatureCard
        icon={Wrench}
        title="How to fix it"
        text="Concrete, actionable suggestions — not just criticism. Every roast comes with a recipe."
      />
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, text }) => (
  <div className="rounded-2xl border border-line bg-surface p-6">
    <Icon className="h-5 w-5 text-ember" />
    <h3 className="mt-3 font-display font-semibold text-ash">{title}</h3>
    <p className="mt-1.5 text-sm text-smoke">{text}</p>
  </div>
);

export default Landing;
