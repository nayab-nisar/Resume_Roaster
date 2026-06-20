import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't log in. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20">
      <Flame className="h-8 w-8 text-ember" />
      <h1 className="mt-3 font-display text-2xl font-bold text-ash">Welcome back</h1>
      <p className="mt-1 text-sm text-smoke">Log in to roast another resume.</p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
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
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-smoke">
        New here?{" "}
        <Link to="/register" className="text-ember hover:text-gold">
          Create an account
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

export default Login;
