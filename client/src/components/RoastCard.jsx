import React from "react";

const TONE_STYLES = {
  issue: "border-emberDeep/40 text-ash",
  strength: "border-gold/40 text-ash",
  suggestion: "border-ember/40 text-ash",
};

const RoastCard = ({ title, icon: Icon, items, tone = "issue", emptyText }) => (
  <div className="rounded-2xl border border-line bg-surface p-6">
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-4 w-4 text-ember" />
      <h3 className="font-display font-semibold text-ash">{title}</h3>
    </div>
    {items?.length ? (
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className={`rounded-lg border-l-2 bg-surface2 px-4 py-3 text-sm leading-relaxed ${TONE_STYLES[tone]}`}
          >
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-smoke">{emptyText || "Nothing here."}</p>
    )}
  </div>
);

export default RoastCard;
