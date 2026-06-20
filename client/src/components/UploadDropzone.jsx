import React, { useRef, useState } from "react";
import { UploadCloud, FileText, Flame } from "lucide-react";

const MAX_SIZE = 5 * 1024 * 1024;

const UploadDropzone = ({ onSubmit, loading }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const validateAndSet = (candidate) => {
    setError("");
    if (!candidate) return;
    if (candidate.type !== "application/pdf") {
      setError("Only PDF files go on the grill.");
      return;
    }
    if (candidate.size > MAX_SIZE) {
      setError("Keep it under 5MB — trim the fat first.");
      return;
    }
    setFile(candidate);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-8 py-14 text-center transition
          ${dragging ? "border-ember bg-surface2" : "border-line bg-surface hover:border-ember/60"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => validateAndSet(e.target.files?.[0])}
        />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-surface2">
          <Flame className="absolute h-7 w-7 text-ember opacity-60 animate-flicker" />
          <UploadCloud className="h-7 w-7 text-gold" strokeWidth={1.8} />
        </div>

        {file ? (
          <div className="flex items-center gap-2 rounded-full bg-surface2 px-4 py-2 text-sm text-ash">
            <FileText className="h-4 w-4 text-ember" />
            {file.name}
          </div>
        ) : (
          <div>
            <p className="font-display text-lg font-semibold text-ash">
              Drop your resume on the grill
            </p>
            <p className="mt-1 text-sm text-smoke">PDF only, up to 5MB</p>
          </div>
        )}

        {error && <p className="text-sm text-emberDeep">{error}</p>}
      </div>

      <button
        disabled={!file || loading}
        onClick={() => onSubmit(file)}
        className="mt-5 w-full rounded-xl bg-ember py-3 font-display font-semibold text-bg transition hover:bg-gold disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "Stoking the fire…" : "Throw it on the grill"}
      </button>
    </div>
  );
};

export default UploadDropzone;
