import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-ash">
          <Flame className="h-5 w-5 text-ember" strokeWidth={2.5} />
          Resume Roaster
        </Link>

        <div className="flex items-center gap-5 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" className="text-smoke transition hover:text-ash">
                Roast a resume
              </Link>
              <Link to="/history" className="text-smoke transition hover:text-ash">
                History
              </Link>
              <span className="hidden text-smoke sm:inline">Hey, {user.name.split(" ")[0]}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-smoke transition hover:border-ember hover:text-ember"
              >
                <LogOut className="h-3.5 w-3.5" />
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-smoke transition hover:text-ash">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-ember px-4 py-1.5 font-medium text-bg transition hover:bg-gold"
              >
                Get roasted
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
