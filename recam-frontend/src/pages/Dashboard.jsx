import { useUser } from "../hooks/useUser";
import CreatePropertyModal from "../components/CreatePropertyModal";
import { useState } from "react";
import {Link} from "react-router-dom";

export default function Dashboard() {
  const { handleLogout } = useUser();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Navbar */}
        <header className="bg-blue-600 text-white flex justify-between items-center px-10 shadow">
          <div className="flex items-center space-x-15 ">
            <div className="text-xl font-bold tracking-wide">recam</div>
            <nav className="flex space-x-8 text-sm">
              <Link to="/listing-cases" className="hover:underline">
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

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="text-white hover:opacity-80 transition"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v13.5a.75.75 0 00.75.75h9.75a.75.75 0 00.75-.75V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        </header>

        {/* Welcome Section */}
        <main>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8 py-4">
            Hi welcome!
          </h1>

          {/* Search + Create Button */}
          <div className="flex justify-center items-center mb-6 gap-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search from listing case"
                className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 text-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              +Create Property
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50 border-b">
                <tr className="text-gray-600 text-left">
                  <th className="py-3 px-4 text-sm font-semibold">PROPERTY</th>
                  <th className="py-3 px-4 text-sm font-semibold">
                    PROPERTY TYPE
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold">
                    PROPERTY ADDRESS
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold">CREATE AT</th>
                  <th className="py-3 px-4 text-sm font-semibold">STATUS</th>
                  <th className="py-3 px-4 text-sm font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-200">
                  <td className="py-3 px-4 text-sm font-medium text-blue-600">
                    #1
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">Townhouse</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    17 Yulie Street
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    11/06/2025
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                      Created
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && <CreatePropertyModal onClose={() => setShowModal(false)} />}
     
    </>
  );
}
