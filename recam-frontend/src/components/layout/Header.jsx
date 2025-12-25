import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export default function Header() {
  const { handleLogout } = useUser();

  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center py-6">
        <div className="flex items-center space-x-16">
          {/* Clickable logo */}
          <Link to="/dashboard" className="text-3xl font-bold tracking-wide">
            recam
          </Link>
          <nav className="flex space-x-8 text-lg">
            <Link to="/listing-cases" className="hover:underline">
              {" "}
              Listing Cases
            </Link>
            <Link to="/all-agents" className="hover:underline">
              Agents
            </Link>
            <Link to="/all-companies" className="hover:underline">
              Photography Companies
            </Link>
          </nav>
        </div>

        {/*Logout button*/}
        <button
          onClick={handleLogout}
          className="text-white hover:opacity-50 transition"
          title="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v13.5a.75.75 0 00.75.75h9.75a.75.75 0 00.75-.75V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
