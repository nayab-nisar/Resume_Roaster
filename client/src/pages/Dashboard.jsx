import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadDropzone from "../components/UploadDropzone.jsx";
import api from "../api/axios.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (file) => {
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await api.post("/roast/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/roast/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "The roast machine jammed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-ash">Time to get roasted</h1>
        <p className="mt-2 text-sm text-smoke">
          Drop in a PDF resume. We'll read it, judge it, and tell you exactly what to fix.
        </p>
      </div>

      <div className="mt-8">
        <UploadDropzone onSubmit={handleSubmit} loading={loading} />
        {error && <p className="mt-4 text-center text-sm text-emberDeep">{error}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
