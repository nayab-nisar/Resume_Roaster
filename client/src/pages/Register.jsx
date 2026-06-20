import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20">
      <Flame className="h-8 w-8 text-ember" />
      <h1 className="mt-3 font-display text-2xl font-bold text-ash">Create an account</h1>
      <p className="mt-1 text-sm text-smoke">It's free. Your ego pays the price.</p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <Field label="Name" type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
        />

        {error && <p className="text-sm text-emberDeep">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-ember py-3 font-display font-semibold text-bg transition hover:bg-gold disabled:opacity-50"
        >
          {loading ? "Setting up…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-smoke">
        Already have an account?{" "}
        <Link to="/login" className="text-ember hover:text-gold">
          Log in
        </Link>
      </p>
    </div>
  );
};

const Field = ({ label, type, value, onChange }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm text-smoke">{label}</span>
    <input
      type={type}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-ash outline-none transition focus:border-ember"
    />
  </label>
);

export default Register;
